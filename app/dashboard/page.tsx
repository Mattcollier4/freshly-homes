"use client";

import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

type Booking = {
  id: number;
  service: string | null;
  first_name: string | null;
  last_name: string | null;
  date: string | null;
  arrival_time: string | null;
  bedrooms: string | number | null;
  bathrooms: string | number | null;
  address: string | null;
  estimated_price: number | null;
  status: string | null;
  phone: string | null;
};

type FilterKey = "all" | "new" | "assigned" | "complete";

const AUTH_KEY = "fh_auth";
const AUTH_PASSWORD = "freshly2025";

function currency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function normalizeStatus(status: string | null): "new" | "assigned" | "complete" {
  const value = (status ?? "new").toLowerCase();
  if (value === "complete") return "complete";
  if (value === "assigned") return "assigned";
  return "new";
}

export default function DashboardPage() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<FilterKey>("all");

  useEffect(() => {
    const existing = localStorage.getItem(AUTH_KEY);
    setIsAuthed(existing === AUTH_PASSWORD);
  }, []);

  useEffect(() => {
    if (!isAuthed) return;

    async function loadBookings() {
      setLoading(true);
      setError("");

      const { data, error: fetchError } = await supabase
        .from("bookings")
        .select(
          "id, service, first_name, last_name, date, arrival_time, bedrooms, bathrooms, address, estimated_price, status, phone",
        )
        .order("date", { ascending: true });

      if (fetchError) {
        setError(fetchError.message);
        setBookings([]);
      } else {
        setBookings((data as Booking[]) ?? []);
      }
      setLoading(false);
    }

    loadBookings();
  }, [isAuthed]);

  const counts = useMemo(() => {
    const normalized = bookings.map((b) => normalizeStatus(b.status));
    return {
      all: bookings.length,
      new: normalized.filter((s) => s === "new").length,
      assigned: normalized.filter((s) => s === "assigned").length,
      complete: normalized.filter((s) => s === "complete").length,
    };
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    if (filter === "all") return bookings;
    return bookings.filter((b) => normalizeStatus(b.status) === filter);
  }, [bookings, filter]);

  const statValues = useMemo(() => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(now.getDate() - now.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const bookingsThisWeek = bookings.filter((booking) => {
      if (!booking.date) return false;
      const d = new Date(`${booking.date}T12:00:00`);
      return d >= startOfWeek && d < endOfWeek;
    }).length;

    const monthlyRevenue = bookings.reduce((sum, booking) => {
      if (!booking.date || booking.estimated_price == null) return sum;
      const d = new Date(`${booking.date}T12:00:00`);
      if (d >= startOfMonth && d < endOfMonth) {
        return sum + Number(booking.estimated_price);
      }
      return sum;
    }, 0);

    const margin = monthlyRevenue * 0.35;

    return {
      unassigned: counts.new,
      bookingsThisWeek,
      monthlyRevenue,
      margin,
    };
  }, [bookings, counts.new]);

  function handleLogin(event: FormEvent) {
    event.preventDefault();
    if (password === AUTH_PASSWORD) {
      localStorage.setItem(AUTH_KEY, AUTH_PASSWORD);
      setAuthError("");
      setIsAuthed(true);
      return;
    }
    setAuthError("Incorrect password");
  }

  if (!isAuthed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#eceee9] px-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md rounded-2xl border border-[#e4e8e4] bg-white p-8 shadow-sm"
        >
          <p className="text-2xl font-medium tracking-[-0.4px] text-[#0c1610]">
            <span className="text-[#1D9E75]">freshly</span> homes
          </p>
          <p className="mt-2 text-sm text-[#5a6b5a]">Operator dashboard login</p>

          <label className="mt-6 block text-xs font-medium uppercase tracking-[0.1em] text-[#5a6b5a]">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-xl border border-[#e4e8e4] px-4 py-3 text-sm outline-none ring-[#1D9E75]/20 transition focus:border-[#1D9E75] focus:ring-4"
            placeholder="Enter password"
          />
          {authError ? <p className="mt-2 text-sm text-red-600">{authError}</p> : null}

          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-[#1D9E75] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#0F6E56]"
          >
            Enter dashboard
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#eceee9] text-[#1a1f1a]">
      <div className="flex">
        <aside className="sticky top-0 hidden h-screen w-60 shrink-0 border-r border-white/5 bg-[#0c1610] lg:flex lg:flex-col">
          <div className="border-b border-white/10 px-6 py-7">
            <p className="text-lg font-medium tracking-[-0.4px] text-white">
              <span className="text-[#1D9E75]">freshly</span> homes
            </p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.08em] text-white/35">
              Live • Operator view
            </p>
          </div>
          <div className="flex-1 px-3 py-4">
            <div className="rounded-lg bg-[#1D9E75]/15 px-3 py-2 text-sm text-[#1D9E75]">
              Job board
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <header className="sticky top-0 z-10 border-b border-[#e4e8e4] bg-white/85 px-6 py-4 backdrop-blur lg:px-9">
            <p className="text-sm font-medium">
              Freshly Homes command center <span className="text-[#1D9E75]">• live bookings</span>
            </p>
          </header>

          <section className="p-6 lg:p-9">
            <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                label="Unassigned jobs"
                value={String(statValues.unassigned)}
                sub="Needs attention"
              />
              <StatCard
                label="Bookings this week"
                value={String(statValues.bookingsThisWeek)}
                sub="Current week load"
              />
              <StatCard
                label="Monthly revenue"
                value={currency(statValues.monthlyRevenue)}
                sub="Summed from estimated_price"
              />
              <StatCard
                label="Margin (35%)"
                value={currency(statValues.margin)}
                sub="Estimated operator margin"
              />
            </div>

            <div className="rounded-2xl border border-[#e4e8e4] bg-white">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e4e8e4] px-6 py-5">
                <div>
                  <h1 className="text-base font-medium">Job cards</h1>
                  <p className="text-sm text-[#5a6b5a]">All upcoming and completed bookings</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      { key: "all", label: `All (${counts.all})` },
                      { key: "new", label: `New (${counts.new})` },
                      { key: "assigned", label: `Assigned (${counts.assigned})` },
                      { key: "complete", label: `Complete (${counts.complete})` },
                    ] as { key: FilterKey; label: string }[]
                  ).map((option) => (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => setFilter(option.key)}
                      className={`rounded-full border px-3 py-1.5 text-xs transition ${
                        filter === option.key
                          ? "border-[#1D9E75] bg-[#1D9E75] text-white"
                          : "border-[#e4e8e4] text-[#5a6b5a] hover:border-[#1D9E75] hover:text-[#1D9E75]"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 p-4">
                {loading ? (
                  <p className="px-2 py-8 text-sm text-[#5a6b5a]">Loading bookings...</p>
                ) : error ? (
                  <p className="px-2 py-8 text-sm text-red-600">{error}</p>
                ) : filteredBookings.length === 0 ? (
                  <p className="px-2 py-8 text-sm text-[#9aaa9a]">No bookings for this filter.</p>
                ) : (
                  filteredBookings.map((booking) => {
                    const status = normalizeStatus(booking.status);
                    return (
                      <article
                        key={booking.id}
                        className="rounded-xl border border-[#e4e8e4] bg-white p-5 transition hover:border-[#1D9E75] hover:shadow-sm"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <h2 className="text-[15px] font-medium">
                            {(booking.first_name ?? "").trim()} {(booking.last_name ?? "").trim() || "Unnamed client"}
                          </h2>
                          <span
                            className={`rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.08em] ${
                              status === "new"
                                ? "bg-blue-100 text-blue-700"
                                : status === "assigned"
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-emerald-100 text-emerald-700"
                            }`}
                          >
                            {status}
                          </span>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2 text-xs">
                          <Chip highlight>{booking.service ?? "Service TBD"}</Chip>
                          <Chip>{booking.date ?? "No date"}</Chip>
                          <Chip>{booking.arrival_time ?? "No window"}</Chip>
                          <Chip>
                            {booking.bedrooms ?? "?"} bed · {booking.bathrooms ?? "?"} bath
                          </Chip>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#e4e8e4] pt-3">
                          <p className="text-sm text-[#5a6b5a]">{booking.address ?? "No address provided"}</p>
                          <p className="text-sm font-semibold text-[#1D9E75]">
                            {currency(Number(booking.estimated_price ?? 0))}
                          </p>
                        </div>
                      </article>
                    );
                  })
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <article className="rounded-2xl border border-[#e4e8e4] bg-white px-6 py-5">
      <p className="text-[11px] uppercase tracking-[0.08em] text-[#5a6b5a]">{label}</p>
      <p className="mt-2 text-3xl font-medium leading-none">{value}</p>
      <p className="mt-2 text-xs text-[#9aaa9a]">{sub}</p>
    </article>
  );
}

function Chip({
  children,
  highlight = false,
}: {
  children: ReactNode;
  highlight?: boolean;
}) {
  return (
    <span
      className={`rounded-md px-2.5 py-1 ${
        highlight ? "bg-[#f0faf6] text-[#0F6E56]" : "bg-[#f2f4f2] text-[#5a6b5a]"
      }`}
    >
      {children}
    </span>
  );
}
