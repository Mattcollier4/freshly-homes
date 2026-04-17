import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

type BookingPayload = {
  service: string | null;
  home: {
    bedrooms: number | string | null;
    bathrooms: number | string | null;
    frequency: string | null;
    extras: string[] | null;
  };
  schedule: {
    date: string | null;
    arrivalWindow: string | null;
  };
  location: {
    address: string | null;
    entryInstructions: string | null;
  };
  customer: {
    firstName: string | null;
    lastName: string | null;
    phone: string | null;
    email: string | null;
  };
  notes: string | null;
  referral: string | null;
  estimatedTotal: number | null;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<BookingPayload>;

    const { error } = await supabase.from("bookings").insert({
      service: body.service,
      bedrooms: body.home?.bedrooms ?? null,
      bathrooms: body.home?.bathrooms ?? null,
      frequency: body.home?.frequency ?? null,
      extras: body.home?.extras ?? [],
      date: body.schedule?.date ?? null,
      arrival_time: body.schedule?.arrivalWindow ?? null,
      address: body.location?.address ?? null,
      entry_notes: body.location?.entryInstructions ?? null,
      first_name: body.customer?.firstName ?? null,
      last_name: body.customer?.lastName ?? null,
      phone: body.customer?.phone ?? null,
      email: body.customer?.email ?? null,
      notes: body.notes ?? null,
      referral: body.referral ?? null,
      estimated_price: body.estimatedTotal ?? null,
      status: "new",
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create booking";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
