"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const BASE_PRICE = 120;

type ServiceOption = {
  id: "standard" | "deep" | "moveout";
  name: string;
  description: string;
  multiplier: number;
  chips: string[];
  popular?: boolean;
};

const serviceOptions: ServiceOption[] = [
  {
    id: "standard",
    name: "Standard clean",
    description:
      "Your regular recurring clean. Keeps your home consistently fresh without the time commitment.",
    multiplier: 1,
    chips: ["Bathrooms", "Kitchen", "Vacuuming", "Mopping", "Dusting"],
  },
  {
    id: "deep",
    name: "Deep clean",
    description:
      "Everything in standard plus the details that build up over time - inside appliances, baseboards, and all the hidden spots.",
    multiplier: 1.7,
    chips: [
      "Everything in standard",
      "Inside oven",
      "Baseboards",
      "Inside fridge",
      "Ceiling fans",
    ],
    popular: true,
  },
  {
    id: "moveout",
    name: "Move in / move out",
    description:
      "Full top-to-bottom for empty homes. Perfect after a move, before a new tenant, or a complete fresh start.",
    multiplier: 2.1,
    chips: [
      "Complete deep clean",
      "Inside all cabinets",
      "Walls spot-cleaned",
      "All appliances",
    ],
  },
] as const;

const bedOptions = [
  { value: "1", label: "bedroom", multiplier: 0.8 },
  { value: "2", label: "bedrooms", multiplier: 1 },
  { value: "3", label: "bedrooms", multiplier: 1.2 },
  { value: "4", label: "bedrooms", multiplier: 1.4 },
  { value: "5", label: "bedrooms", multiplier: 1.6 },
  { value: "6+", label: "bedrooms", multiplier: 1.8 },
] as const;

const bathOptions = [
  { value: "1", label: "bath", multiplier: 0.9 },
  { value: "2", label: "baths", multiplier: 1 },
  { value: "3", label: "baths", multiplier: 1.15 },
  { value: "4+", label: "baths", multiplier: 1.3 },
] as const;

const freqOptions = [
  { value: "One time", title: "Once", subtitle: "One-time clean", multiplier: 1 },
  { value: "Weekly", title: "Weekly", subtitle: "Save ~18%", multiplier: 0.82 },
  { value: "Biweekly", title: "Biweekly", subtitle: "Save ~10%", multiplier: 0.9 },
  { value: "Monthly", title: "Monthly", subtitle: "Flexible", multiplier: 1 },
] as const;

const extras = [
  { name: "Inside oven", desc: "Full interior clean", multiplier: 0.08 },
  { name: "Inside fridge", desc: "Shelves and drawers", multiplier: 0.08 },
  { name: "Laundry (wash + dry)", desc: "One load wash + dry", multiplier: 0.1 },
  { name: "Window interior clean", desc: "All accessible windows", multiplier: 0.12 },
  { name: "Cabinet interiors", desc: "Kitchen + bathrooms", multiplier: 0.1 },
  { name: "Garage sweep", desc: "Sweep and tidy", multiplier: 0.08 },
] as const;

const timeSlots = [
  { label: "8-9 AM", value: "8:00 - 9:00 AM", unavailable: false },
  { label: "9-10 AM", value: "9:00 - 10:00 AM", unavailable: false },
  { label: "10-11 AM", value: "10:00 - 11:00 AM", unavailable: false },
  { label: "11-12 PM", value: "11:00 AM - 12:00 PM", unavailable: false },
  { label: "12-1 PM", value: "12:00 - 1:00 PM", unavailable: false },
  { label: "1-2 PM", value: "1:00 - 2:00 PM", unavailable: false },
  { label: "2-3 PM", value: "2:00 - 3:00 PM", unavailable: false },
  { label: "3-4 PM", value: "3:00 - 4:00 PM", unavailable: true },
  { label: "4-5 PM", value: "4:00 - 5:00 PM", unavailable: true },
] as const;

type ServiceId = ServiceOption["id"];

function formatService(service: ServiceId | null) {
  if (!service) return "—";
  const map: Record<ServiceId, string> = {
    standard: "Standard clean",
    deep: "Deep clean",
    moveout: "Move in / move out",
  };
  return map[service];
}

function formatDate(date: string) {
  if (!date) return null;
  const dt = new Date(`${date}T12:00:00`);
  return dt.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function tomorrowDateString() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0] ?? "";
}

export default function BookPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);

  const [service, setService] = useState<ServiceId | null>(null);
  const [serviceMultiplier, setServiceMultiplier] = useState(1);

  const [beds, setBeds] = useState<string | null>(null);
  const [bedsMultiplier, setBedsMultiplier] = useState(1);

  const [baths, setBaths] = useState<string | null>(null);
  const [bathsMultiplier, setBathsMultiplier] = useState(1);

  const [freq, setFreq] = useState<string | null>(null);
  const [freqMultiplier, setFreqMultiplier] = useState(1);

  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [extraMultiplier, setExtraMultiplier] = useState(0);

  const [date, setDate] = useState("");
  const [time, setTime] = useState<string | null>(null);
  const [address, setAddress] = useState("");
  const [entry, setEntry] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [referral, setReferral] = useState("");

  const total = useMemo(() => {
    if (!service || !beds || !baths) return null;
    const price =
      BASE_PRICE *
      serviceMultiplier *
      bedsMultiplier *
      bathsMultiplier *
      freqMultiplier *
      (1 + extraMultiplier);
    return Math.round(price / 5) * 5;
  }, [
    service,
    beds,
    baths,
    serviceMultiplier,
    bedsMultiplier,
    bathsMultiplier,
    freqMultiplier,
    extraMultiplier,
  ]);

  const canShowQuote = Boolean(service);

  function goToStep(step: number) {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function validateAndNext(from: number) {
    if (from === 1 && !service) {
      window.alert("Please select a service type to continue.");
      return;
    }
    if (from === 2 && (!beds || !baths)) {
      window.alert("Please select the number of bedrooms and bathrooms.");
      return;
    }
    if (from === 3) {
      if (!date) {
        window.alert("Please select a date.");
        return;
      }
      if (!time) {
        window.alert("Please select an arrival window.");
        return;
      }
      if (!address.trim()) {
        window.alert("Please enter your service address.");
        return;
      }
    }
    if (from === 4) {
      if (!firstName.trim() || !lastName.trim()) {
        window.alert("Please enter your full name.");
        return;
      }
      if (!phone.trim()) {
        window.alert("Please enter your mobile number.");
        return;
      }
      if (!email.trim()) {
        window.alert("Please enter your email address.");
        return;
      }
    }
    goToStep(from + 1);
  }

  function toggleExtra(name: string, multiplier: number) {
    setSelectedExtras((prev) => {
      const exists = prev.includes(name);
      if (exists) {
        setExtraMultiplier((m) => Math.max(0, m - multiplier));
        return prev.filter((item) => item !== name);
      }
      setExtraMultiplier((m) => m + multiplier);
      return [...prev, name];
    });
  }

  async function confirmBooking() {
    setIsSubmitting(true);

    const payload = {
      service,
      home: {
        bedrooms: beds,
        bathrooms: baths,
        frequency: freq,
        extras: selectedExtras,
      },
      schedule: {
        date,
        arrivalWindow: time,
      },
      location: {
        address,
        entryInstructions: entry,
      },
      customer: {
        firstName,
        lastName,
        phone,
        email,
      },
      notes,
      referral,
      estimatedTotal: total,
    };

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { bookingId?: string; error?: string };
      if (!response.ok) {
        throw new Error(data.error || "Booking request failed.");
      }

      setBookingId(data.bookingId ?? null);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong.";
      window.alert(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  const reviewRows = [
    ["Service", formatService(service)],
    ["Home size", `${beds ?? "—"} bed, ${baths ?? "—"} bath`],
    ["Frequency", freq ?? "—"],
    ...(selectedExtras.length ? [["Extras", selectedExtras.join(", ")] as [string, string]] : []),
    ["Date", formatDate(date) ?? "—"],
    ["Arrival window", time ?? "—"],
    ["Address", address || "—"],
    ["Name", `${firstName} ${lastName}`.trim() || "—"],
    ["Phone", phone || "—"],
    ["Email", email || "—"],
    ["Estimated total", total ? `$${total.toLocaleString()}` : "—"],
  ];

  const successRows = [
    ...(bookingId ? ([["Booking reference", bookingId]] as [string, string][]) : []),
    ["Service", formatService(service)],
    ["Date", formatDate(date) ?? "—"],
    ["Arrival window", time ?? "—"],
    ["Address", address || "—"],
    ["Name", `${firstName} ${lastName}`.trim() || "—"],
    ["Confirmation sent to", phone || "—"],
    ["Estimated total", total ? `$${total.toLocaleString()} (due after clean)` : "—"],
  ];

  return (
    <main className={`${dmSans.variable} ${cormorant.variable} min-h-screen bg-[#fafaf7] text-[#1a1f1a]`}>
      <nav className="flex h-[60px] items-center justify-between border-b border-white/10 bg-[rgba(12,22,16,0.97)] px-6 backdrop-blur">
        <Link href="/" className="text-lg font-medium tracking-[-0.3px] text-white">
          <span className="text-[#1D9E75]">freshly</span> homes
        </Link>
        <Link href="/" className="text-sm text-white/50 transition hover:text-white">
          ← Back to home
        </Link>
      </nav>

      <div className="grid min-h-[calc(100vh-60px)] grid-cols-1 lg:grid-cols-[1fr_380px]">
        <section className="px-6 py-10 pb-20 lg:px-14 lg:py-14 xl:px-[72px] xl:py-16">
          {!submitted ? (
            <>
              <header className="mb-9">
                <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.1em] text-[#1D9E75]">
                  Online booking
                </p>
                <h1
                  className="mb-2 text-[clamp(28px,5vw,40px)] font-medium leading-[1.15] tracking-[-0.5px]"
                  style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                >
                  Book your clean
                </h1>
                <p className="text-sm text-[#5a6b5a]">
                  Takes 90 seconds. Price shown before you submit. No account needed.
                </p>
              </header>

              <div className="mb-9">
                <div className="mb-2 flex">
                  {[1, 2, 3, 4, 5].map((step) => {
                    const isActive = currentStep === step;
                    const isDone = currentStep > step;
                    return (
                      <div key={step} className="relative flex flex-1 flex-col items-center">
                        {step < 5 ? (
                          <div
                            className={`absolute left-1/2 top-[14px] h-px w-full ${
                              isDone ? "bg-[#1D9E75]" : "bg-[#e4e8e4]"
                            }`}
                          />
                        ) : null}
                        <div
                          className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full border-[1.5px] text-xs font-medium ${
                            isActive
                              ? "border-[#1D9E75] bg-[#1D9E75] text-white"
                              : isDone
                                ? "border-[#1D9E75] bg-[#E1F5EE] text-[#1D9E75]"
                                : "border-[#e4e8e4] bg-white text-[#9aaa9a]"
                          }`}
                        >
                          {step}
                        </div>
                        <p
                          className={`mt-1 hidden text-[10px] lg:block ${isActive ? "text-[#1D9E75]" : "text-[#9aaa9a]"}`}
                        >
                          {["Service", "Details", "Schedule", "Your info", "Confirm"][step - 1]}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {currentStep === 1 ? (
                <div>
                  <h2 className="mb-5 border-b border-[#e4e8e4] pb-4 text-base font-medium">
                    What type of clean do you need?
                  </h2>
                  <div className="mb-7 grid gap-3">
                    {serviceOptions.map((option) => {
                      const selected = service === option.id;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => {
                            setService(option.id);
                            setServiceMultiplier(option.multiplier);
                          }}
                          className={`relative overflow-hidden rounded-[14px] border-[1.5px] p-5 text-left transition ${
                            selected
                              ? "border-[#1D9E75] bg-[#f0faf6]"
                              : "border-[#e4e8e4] bg-white hover:border-[#1D9E75]"
                          }`}
                        >
                          {selected ? (
                            <span className="absolute right-4 top-[14px] flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#1D9E75] text-[11px] text-white">
                              ✓
                            </span>
                          ) : null}
                          {option.popular ? (
                            <span className="mb-2 inline-block rounded-full bg-[#1D9E75] px-2 py-[2px] text-[10px] font-medium text-white">
                              Most popular
                            </span>
                          ) : null}
                          <p className="mb-1 text-[15px] font-medium">{option.name}</p>
                          <p className="mb-2.5 text-xs leading-relaxed text-[#5a6b5a]">{option.description}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {option.chips.map((chip) => (
                              <span
                                key={chip}
                                className={`rounded-full px-2.5 py-[3px] text-[11px] ${
                                  selected ? "bg-[#E1F5EE] text-[#0F6E56]" : "bg-[#f2f4f2] text-[#5a6b5a]"
                                }`}
                              >
                                {chip}
                              </span>
                            ))}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-8 flex gap-3">
                    <button
                      type="button"
                      onClick={() => validateAndNext(1)}
                      className="flex-1 rounded-[10px] bg-[#1D9E75] px-6 py-[15px] text-[15px] font-medium text-white transition hover:bg-[#0F6E56]"
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              ) : null}

              {currentStep === 2 ? (
                <div>
                  <h2 className="mb-5 border-b border-[#e4e8e4] pb-4 text-base font-medium">
                    Tell us about your home
                  </h2>

                  <div className="mb-6">
                    <label className="mb-1.5 block text-xs font-medium">
                      Number of bedrooms <span className="text-[#1D9E75]">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {bedOptions.map((option) => {
                        const selected = beds === option.value;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              setBeds(option.value);
                              setBedsMultiplier(option.multiplier);
                            }}
                            className={`rounded-[10px] border-[1.5px] px-2.5 py-3.5 text-center transition ${
                              selected
                                ? "border-[#1D9E75] bg-[#f0faf6] text-[#0F6E56]"
                                : "border-[#e4e8e4] bg-white hover:border-[#1D9E75]"
                            }`}
                          >
                            <div
                              className="mb-0.5 text-2xl leading-none"
                              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                            >
                              {option.value}
                            </div>
                            <div className={`text-[11px] ${selected ? "text-[#0F6E56]" : "text-[#5a6b5a]"}`}>
                              {option.label}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="mb-1.5 block text-xs font-medium">
                      Number of bathrooms <span className="text-[#1D9E75]">*</span>
                    </label>
                    <div className="grid grid-cols-4 gap-2.5">
                      {bathOptions.map((option) => {
                        const selected = baths === option.value;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              setBaths(option.value);
                              setBathsMultiplier(option.multiplier);
                            }}
                            className={`rounded-[10px] border-[1.5px] px-2.5 py-3.5 text-center transition ${
                              selected
                                ? "border-[#1D9E75] bg-[#f0faf6] text-[#0F6E56]"
                                : "border-[#e4e8e4] bg-white hover:border-[#1D9E75]"
                            }`}
                          >
                            <div
                              className="mb-0.5 text-2xl leading-none"
                              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                            >
                              {option.value}
                            </div>
                            <div className={`text-[11px] ${selected ? "text-[#0F6E56]" : "text-[#5a6b5a]"}`}>
                              {option.label}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mb-7">
                    <p className="mb-3.5 text-[13px] font-medium text-[#5a6b5a]">
                      How often would you like us to clean?
                    </p>
                    <div className="grid grid-cols-2 gap-2.5">
                      {freqOptions.map((option) => {
                        const selected = freq === option.value;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              setFreq(option.value);
                              setFreqMultiplier(option.multiplier);
                            }}
                            className={`rounded-[10px] border-[1.5px] px-2.5 py-3.5 text-center transition ${
                              selected
                                ? "border-[#1D9E75] bg-[#f0faf6] text-[#0F6E56]"
                                : "border-[#e4e8e4] bg-white hover:border-[#1D9E75]"
                            }`}
                          >
                            <div className="mb-0.5 text-base leading-none">{option.title}</div>
                            <div className={`text-[11px] ${selected ? "text-[#0F6E56]" : "text-[#5a6b5a]"}`}>
                              {option.subtitle}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mb-7">
                    <p className="mb-3.5 text-[13px] font-medium text-[#5a6b5a]">Any extras? (optional)</p>
                    <div className="grid gap-2.5 lg:grid-cols-2">
                      {extras.map((extra) => {
                        const selected = selectedExtras.includes(extra.name);
                        return (
                          <button
                            key={extra.name}
                            type="button"
                            onClick={() => toggleExtra(extra.name, extra.multiplier)}
                            className={`flex items-center gap-3.5 rounded-[10px] border-[1.5px] px-4 py-3.5 text-left transition ${
                              selected
                                ? "border-[#1D9E75] bg-[#f0faf6]"
                                : "border-[#e4e8e4] bg-white hover:border-[#1D9E75]"
                            }`}
                          >
                            <span
                              className={`flex h-5 w-5 items-center justify-center rounded-[5px] border-[1.5px] ${
                                selected ? "border-[#1D9E75] bg-[#1D9E75]" : "border-[#e4e8e4]"
                              }`}
                            >
                              {selected ? <span className="h-2 w-2 rounded-full bg-white" /> : null}
                            </span>
                            <span className="flex-1">
                              <span className="block text-[13px] font-medium">{extra.name}</span>
                              <span className="block text-[11px] text-[#5a6b5a]">{extra.desc}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-8 flex gap-3">
                    <button
                      type="button"
                      onClick={() => goToStep(1)}
                      className="rounded-[10px] border-[1.5px] border-[#e4e8e4] px-5 py-[15px] text-sm text-[#5a6b5a] transition hover:border-[#1a1f1a] hover:text-[#1a1f1a]"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => validateAndNext(2)}
                      className="flex-1 rounded-[10px] bg-[#1D9E75] px-6 py-[15px] text-[15px] font-medium text-white transition hover:bg-[#0F6E56]"
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              ) : null}

              {currentStep === 3 ? (
                <div>
                  <h2 className="mb-5 border-b border-[#e4e8e4] pb-4 text-base font-medium">When works for you?</h2>

                  <div className="mb-5">
                    <label className="mb-1.5 block text-xs font-medium">
                      Preferred date <span className="text-[#1D9E75]">*</span>
                    </label>
                    <input
                      type="date"
                      min={tomorrowDateString()}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full rounded-[10px] border-[1.5px] border-[#e4e8e4] bg-white px-[14px] py-3 text-sm outline-none transition focus:border-[#1D9E75] focus:ring-4 focus:ring-[#1D9E75]/10"
                    />
                    <p className="mt-1 text-[11px] text-[#9aaa9a]">
                      We&apos;re available Monday - Saturday. Sundays by request.
                    </p>
                  </div>

                  <div className="mb-7">
                    <label className="mb-1.5 block text-xs font-medium">
                      Preferred arrival window <span className="text-[#1D9E75]">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((slot) => {
                        const selected = time === slot.value;
                        return (
                          <button
                            key={slot.label}
                            type="button"
                            disabled={slot.unavailable}
                            onClick={() => setTime(slot.value)}
                            className={`rounded-lg border-[1.5px] px-1.5 py-2.5 text-center text-xs font-medium transition ${
                              slot.unavailable
                                ? "cursor-not-allowed border-[#e4e8e4] bg-[#f2f4f2] text-[#5a6b5a] opacity-35"
                                : selected
                                  ? "border-[#1D9E75] bg-[#f0faf6] text-[#0F6E56]"
                                  : "border-[#e4e8e4] bg-white text-[#5a6b5a] hover:border-[#1D9E75] hover:text-[#1a1f1a]"
                            }`}
                          >
                            {slot.label}
                          </button>
                        );
                      })}
                    </div>
                    <p className="mt-1 text-[11px] text-[#9aaa9a]">
                      Grayed out slots are currently unavailable. Exact arrival confirmed 24 hrs before.
                    </p>
                  </div>

                  <div className="mb-5">
                    <label className="mb-1.5 block text-xs font-medium">
                      Service address <span className="text-[#1D9E75]">*</span>
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="123 Main St, Lee's Summit, MO 64063"
                      className="w-full rounded-[10px] border-[1.5px] border-[#e4e8e4] bg-white px-[14px] py-3 text-sm outline-none transition focus:border-[#1D9E75] focus:ring-4 focus:ring-[#1D9E75]/10"
                    />
                  </div>

                  <div className="mb-5">
                    <label className="mb-1.5 block text-xs font-medium">Entry instructions</label>
                    <textarea
                      value={entry}
                      onChange={(e) => setEntry(e.target.value)}
                      placeholder="e.g. door code is 1234, key under the mat, dogs will be in the crate..."
                      className="min-h-[90px] w-full resize-y rounded-[10px] border-[1.5px] border-[#e4e8e4] bg-white px-[14px] py-3 text-sm outline-none transition focus:border-[#1D9E75] focus:ring-4 focus:ring-[#1D9E75]/10"
                    />
                    <p className="mt-1 text-[11px] text-[#9aaa9a]">
                      You don&apos;t need to be home - just tell us how to get in.
                    </p>
                  </div>

                  <div className="mt-8 flex gap-3">
                    <button
                      type="button"
                      onClick={() => goToStep(2)}
                      className="rounded-[10px] border-[1.5px] border-[#e4e8e4] px-5 py-[15px] text-sm text-[#5a6b5a] transition hover:border-[#1a1f1a] hover:text-[#1a1f1a]"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => validateAndNext(3)}
                      className="flex-1 rounded-[10px] bg-[#1D9E75] px-6 py-[15px] text-[15px] font-medium text-white transition hover:bg-[#0F6E56]"
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              ) : null}

              {currentStep === 4 ? (
                <div>
                  <h2 className="mb-5 border-b border-[#e4e8e4] pb-4 text-base font-medium">Your contact details</h2>
                  <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium">
                        First name <span className="text-[#1D9E75]">*</span>
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Sarah"
                        className="w-full rounded-[10px] border-[1.5px] border-[#e4e8e4] bg-white px-[14px] py-3 text-sm outline-none transition focus:border-[#1D9E75] focus:ring-4 focus:ring-[#1D9E75]/10"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium">
                        Last name <span className="text-[#1D9E75]">*</span>
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Mitchell"
                        className="w-full rounded-[10px] border-[1.5px] border-[#e4e8e4] bg-white px-[14px] py-3 text-sm outline-none transition focus:border-[#1D9E75] focus:ring-4 focus:ring-[#1D9E75]/10"
                      />
                    </div>
                  </div>
                  <div className="mb-5">
                    <label className="mb-1.5 block text-xs font-medium">
                      Mobile number <span className="text-[#1D9E75]">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(816) 555-0100"
                      className="w-full rounded-[10px] border-[1.5px] border-[#e4e8e4] bg-white px-[14px] py-3 text-sm outline-none transition focus:border-[#1D9E75] focus:ring-4 focus:ring-[#1D9E75]/10"
                    />
                    <p className="mt-1 text-[11px] text-[#9aaa9a]">
                      We text your confirmation, reminder, and updates to this number.
                    </p>
                  </div>
                  <div className="mb-5">
                    <label className="mb-1.5 block text-xs font-medium">
                      Email address <span className="text-[#1D9E75]">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sarah@example.com"
                      className="w-full rounded-[10px] border-[1.5px] border-[#e4e8e4] bg-white px-[14px] py-3 text-sm outline-none transition focus:border-[#1D9E75] focus:ring-4 focus:ring-[#1D9E75]/10"
                    />
                    <p className="mt-1 text-[11px] text-[#9aaa9a]">
                      Your booking confirmation and receipt will be sent here.
                    </p>
                  </div>
                  <div className="mb-5">
                    <label className="mb-1.5 block text-xs font-medium">Anything else we should know?</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Pets, allergies, specific areas to focus on, parking info..."
                      className="min-h-[90px] w-full resize-y rounded-[10px] border-[1.5px] border-[#e4e8e4] bg-white px-[14px] py-3 text-sm outline-none transition focus:border-[#1D9E75] focus:ring-4 focus:ring-[#1D9E75]/10"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="mb-1.5 block text-xs font-medium">How did you hear about us?</label>
                    <select
                      value={referral}
                      onChange={(e) => setReferral(e.target.value)}
                      className="w-full appearance-none rounded-[10px] border-[1.5px] border-[#e4e8e4] bg-white px-[14px] py-3 text-sm outline-none transition focus:border-[#1D9E75] focus:ring-4 focus:ring-[#1D9E75]/10"
                    >
                      <option value="">Select one</option>
                      <option>Google search</option>
                      <option>Nextdoor</option>
                      <option>Facebook</option>
                      <option>Friend or neighbor</option>
                      <option>Moving company referral</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="mt-8 flex gap-3">
                    <button
                      type="button"
                      onClick={() => goToStep(3)}
                      className="rounded-[10px] border-[1.5px] border-[#e4e8e4] px-5 py-[15px] text-sm text-[#5a6b5a] transition hover:border-[#1a1f1a] hover:text-[#1a1f1a]"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => validateAndNext(4)}
                      className="flex-1 rounded-[10px] bg-[#1D9E75] px-6 py-[15px] text-[15px] font-medium text-white transition hover:bg-[#0F6E56]"
                    >
                      Review booking →
                    </button>
                  </div>
                </div>
              ) : null}

              {currentStep === 5 ? (
                <div>
                  <h2 className="mb-5 border-b border-[#e4e8e4] pb-4 text-base font-medium">Review your booking</h2>
                  <div className="mb-6 rounded-[14px] border border-[#e4e8e4] bg-white p-6">
                    {reviewRows.map(([label, value], idx) => (
                      <div
                        key={`${label}-${idx}`}
                        className="flex justify-between border-b border-[#e4e8e4] py-2.5 text-[13px] last:border-b-0"
                      >
                        <span className="text-[#5a6b5a]">{label}</span>
                        <span className="max-w-[60%] text-right font-medium">{value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mb-6 rounded-xl border border-[#1D9E75]/20 bg-[#f0faf6] px-5 py-4">
                    <p className="mb-1 text-[13px] font-medium text-[#0F6E56]">What happens next</p>
                    <p className="text-xs leading-relaxed text-[#5a6b5a]">
                      You&apos;ll receive a confirmation text and email immediately after booking. The night
                      before your clean, we&apos;ll send a reminder. On the day, you&apos;ll get a text when
                      your cleaner is on the way. Payment is collected after the clean is complete - not before.
                    </p>
                  </div>

                  <p className="mb-6 text-xs leading-relaxed text-[#5a6b5a]">
                    By confirming this booking you agree to our{" "}
                    <a href="#" className="text-[#1D9E75]">
                      terms of service
                    </a>
                    . You can reschedule or cancel up to 24 hours before your appointment at no charge.
                  </p>

                  <div className="mt-8 flex gap-3">
                    <button
                      type="button"
                      onClick={() => goToStep(4)}
                      className="rounded-[10px] border-[1.5px] border-[#e4e8e4] px-5 py-[15px] text-sm text-[#5a6b5a] transition hover:border-[#1a1f1a] hover:text-[#1a1f1a]"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={confirmBooking}
                      disabled={isSubmitting}
                      className="flex-1 rounded-[10px] bg-[#1D9E75] px-6 py-[15px] text-[15px] font-medium text-white transition hover:bg-[#0F6E56]"
                    >
                      {isSubmitting ? "Booking..." : "Confirm booking ✓"}
                    </button>
                  </div>
                </div>
              ) : null}
            </>
          ) : (
            <section className="px-2 py-10 text-center">
              <div className="mx-auto mb-6 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#E1F5EE]">
                <div className="h-7 w-7 rounded-full bg-[#1D9E75]" />
              </div>
              <h2
                className="mb-3 text-[32px] font-medium"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                You&apos;re all booked.
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-[15px] leading-relaxed text-[#5a6b5a]">
                A confirmation text and email are on their way right now. We&apos;ll remind you the
                night before and text you when your cleaner is on the way.
              </p>

              <div className="mx-auto mb-6 max-w-2xl rounded-[14px] border border-[#e4e8e4] bg-white p-6 text-left">
                {successRows.map(([label, value], idx) => (
                  <div
                    key={`${label}-${idx}`}
                    className="flex justify-between border-b border-[#e4e8e4] py-2 text-[13px] last:border-b-0"
                  >
                    <span className="text-[#5a6b5a]">{label}</span>
                    <span className="max-w-[60%] text-right font-medium">{value}</span>
                  </div>
                ))}
              </div>

              <div className="mx-auto max-w-2xl rounded-xl bg-[#f0faf6] px-5 py-4 text-left text-[13px] leading-relaxed text-[#0F6E56]">
                Questions or need to reschedule? Text us at <strong>(816) 555-0100</strong> or email{" "}
                <strong>hello@freshly.homes</strong> - we respond fast.
              </div>
            </section>
          )}
        </section>

        <aside className="sticky top-[60px] hidden h-[calc(100vh-60px)] overflow-y-auto bg-[#0c1610] px-8 py-10 lg:block xl:px-10 xl:py-14">
          <p className="mb-8 text-base font-medium tracking-[-0.3px] text-white">
            <span className="text-[#1D9E75]">freshly</span> homes
          </p>
          <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.1em] text-white/35">
            Your booking summary
          </p>

          {!canShowQuote || submitted ? (
            <div className="py-10 text-center text-[13px] leading-relaxed text-white/25">
              Select a service to see
              <br />
              your instant price estimate.
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="flex items-start justify-between border-b border-white/10 py-3 text-[13px]">
                  <span className="text-white/45">Service</span>
                  <span className="max-w-[55%] text-right font-medium text-[#1D9E75]">
                    {formatService(service)}
                  </span>
                </div>
                <div className="flex items-start justify-between border-b border-white/10 py-3 text-[13px]">
                  <span className="text-white/45">Bedrooms</span>
                  <span className="max-w-[55%] text-right font-medium text-white">
                    {beds ? `${beds} ${beds === "1" ? "bedroom" : "bedrooms"}` : "—"}
                  </span>
                </div>
                <div className="flex items-start justify-between border-b border-white/10 py-3 text-[13px]">
                  <span className="text-white/45">Bathrooms</span>
                  <span className="max-w-[55%] text-right font-medium text-white">
                    {baths ? `${baths} ${baths === "1" ? "bathroom" : "bathrooms"}` : "—"}
                  </span>
                </div>
                <div className="flex items-start justify-between border-b border-white/10 py-3 text-[13px]">
                  <span className="text-white/45">Frequency</span>
                  <span className="max-w-[55%] text-right font-medium text-white">{freq ?? "—"}</span>
                </div>
                {selectedExtras.length ? (
                  <div className="flex items-start justify-between border-b border-white/10 py-3 text-[13px]">
                    <span className="text-white/45">Extras</span>
                    <span className="max-w-[55%] text-right font-medium text-white">
                      {selectedExtras.join(", ")}
                    </span>
                  </div>
                ) : null}
                {date ? (
                  <div className="flex items-start justify-between border-b border-white/10 py-3 text-[13px]">
                    <span className="text-white/45">Date</span>
                    <span className="max-w-[55%] text-right font-medium text-white">
                      {formatDate(date) ?? "—"}
                    </span>
                  </div>
                ) : null}
                {time ? (
                  <div className="flex items-start justify-between border-b border-white/10 py-3 text-[13px]">
                    <span className="text-white/45">Arrival</span>
                    <span className="max-w-[55%] text-right font-medium text-white">{time}</span>
                  </div>
                ) : null}
                {firstName || lastName ? (
                  <div className="flex items-start justify-between py-3 text-[13px]">
                    <span className="text-white/45">Name</span>
                    <span className="max-w-[55%] text-right font-medium text-white">
                      {`${firstName} ${lastName}`.trim()}
                    </span>
                  </div>
                ) : null}
              </div>

              <div className="mb-5 rounded-xl border border-[#1D9E75]/20 bg-[#1D9E75]/10 p-[18px]">
                <p className="mb-1.5 text-[11px] text-white/40">Estimated total</p>
                <p
                  className="mb-1 text-[40px] leading-none text-white"
                  style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                >
                  {total ? (
                    <>
                      <span className="align-super text-xl font-normal" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                        $
                      </span>
                      {total.toLocaleString()}
                    </>
                  ) : (
                    "Select details"
                  )}
                </p>
                <p className="text-[11px] text-white/30">
                  Final price confirmed after booking. Pay after completion.
                </p>
              </div>
            </>
          )}

          <div className="mt-5">
            {[
              "Confirmation sent immediately",
              "Reminder the night before",
              "Pay after completion only",
              "24-hour satisfaction promise",
              "Cancel free up to 24hrs before",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5 border-b border-white/5 py-2 text-xs text-white/40 last:border-b-0">
                <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-[#1D9E75]" />
                {item}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
