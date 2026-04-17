import { NextResponse } from "next/server";
import { Resend } from "resend";
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
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json(
        { error: "Missing RESEND_API_KEY environment variable" },
        { status: 500 },
      );
    }

    const resend = new Resend(resendApiKey);
    const body = (await request.json()) as Partial<BookingPayload>;
    const service = body.service ?? "—";
    const bedrooms = body.home?.bedrooms ?? "—";
    const bathrooms = body.home?.bathrooms ?? "—";
    const frequency = body.home?.frequency ?? "—";
    const extras = body.home?.extras?.length ? body.home.extras.join(", ") : "None";
    const date = body.schedule?.date ?? "—";
    const arrivalWindow = body.schedule?.arrivalWindow ?? "—";
    const address = body.location?.address ?? "—";
    const entryNotes = body.location?.entryInstructions ?? "—";
    const estimatedPrice = body.estimatedTotal ?? null;
    const firstName = body.customer?.firstName ?? "";
    const lastName = body.customer?.lastName ?? "";
    const phone = body.customer?.phone ?? "—";
    const clientEmail = body.customer?.email ?? "";
    const clientName = `${firstName} ${lastName}`.trim() || "Client";
    const notes = body.notes ?? "—";
    const referral = body.referral ?? "—";

    const { error } = await supabase.from("bookings").insert({
      service,
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

    if (!clientEmail) {
      return NextResponse.json(
        { error: "Client email is required to send confirmation" },
        { status: 400 },
      );
    }

    const estimatedPriceDisplay =
      estimatedPrice !== null ? `$${estimatedPrice.toLocaleString()}` : "TBD";

    const emailStyles = `
      font-family: Arial, sans-serif; color: #1a1f1a; line-height: 1.6;
    `;
    const cardStyles = `
      max-width: 620px; margin: 0 auto; border: 1px solid #e4e8e4;
      border-radius: 12px; padding: 24px; background: #ffffff;
    `;
    const detailRowStyles = `
      margin: 0; padding: 10px 0; border-bottom: 1px solid #e4e8e4;
    `;

    const confirmationHtml = `
      <div style="${emailStyles}">
        <div style="${cardStyles}">
          <h1 style="margin: 0 0 4px; font-size: 24px;">Freshly Homes</h1>
          <p style="margin: 0 0 20px; color: #1D9E75; font-weight: 600;">
            Your home, always at its best.
          </p>
          <p style="margin: 0 0 16px;">Hi ${clientName}, your booking is confirmed.</p>
          <p style="${detailRowStyles}"><strong>Service:</strong> ${service}</p>
          <p style="${detailRowStyles}"><strong>Date:</strong> ${date}</p>
          <p style="${detailRowStyles}"><strong>Arrival window:</strong> ${arrivalWindow}</p>
          <p style="${detailRowStyles}"><strong>Address:</strong> ${address}</p>
          <p style="margin: 0; padding: 10px 0 0;"><strong>Estimated price:</strong> ${estimatedPriceDisplay}</p>
        </div>
      </div>
    `;

    const internalNotificationHtml = `
      <div style="${emailStyles}">
        <div style="${cardStyles}">
          <h1 style="margin: 0 0 4px; font-size: 24px;">New Freshly Homes Booking</h1>
          <p style="margin: 0 0 20px; color: #1D9E75; font-weight: 600;">
            Your home, always at its best.
          </p>
          <p style="${detailRowStyles}"><strong>Client:</strong> ${clientName}</p>
          <p style="${detailRowStyles}"><strong>Email:</strong> ${clientEmail}</p>
          <p style="${detailRowStyles}"><strong>Phone:</strong> ${phone}</p>
          <p style="${detailRowStyles}"><strong>Service:</strong> ${service}</p>
          <p style="${detailRowStyles}"><strong>Bedrooms:</strong> ${bedrooms}</p>
          <p style="${detailRowStyles}"><strong>Bathrooms:</strong> ${bathrooms}</p>
          <p style="${detailRowStyles}"><strong>Frequency:</strong> ${frequency}</p>
          <p style="${detailRowStyles}"><strong>Extras:</strong> ${extras}</p>
          <p style="${detailRowStyles}"><strong>Date:</strong> ${date}</p>
          <p style="${detailRowStyles}"><strong>Arrival window:</strong> ${arrivalWindow}</p>
          <p style="${detailRowStyles}"><strong>Address:</strong> ${address}</p>
          <p style="${detailRowStyles}"><strong>Entry notes:</strong> ${entryNotes}</p>
          <p style="${detailRowStyles}"><strong>Additional notes:</strong> ${notes}</p>
          <p style="${detailRowStyles}"><strong>Referral:</strong> ${referral}</p>
          <p style="margin: 0; padding: 10px 0 0;"><strong>Estimated price:</strong> ${estimatedPriceDisplay}</p>
        </div>
      </div>
    `;

    const [clientEmailResult, internalEmailResult] = await Promise.all([
      resend.emails.send({
        from: "onboarding@resend.dev",
        to: clientEmail,
        subject: "Your Freshly Homes booking confirmation",
        html: confirmationHtml,
      }),
      resend.emails.send({
        from: "onboarding@resend.dev",
        to: "matthewcollierjacob@gmail.com",
        subject: "New booking received",
        html: internalNotificationHtml,
      }),
    ]);

    if (clientEmailResult.error) {
      return NextResponse.json(
        { error: clientEmailResult.error.message },
        { status: 500 },
      );
    }
    if (internalEmailResult.error) {
      return NextResponse.json(
        { error: internalEmailResult.error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create booking";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
