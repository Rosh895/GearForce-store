import { NextResponse } from "next/server";
import { getCheckoutStatus } from "@/lib/checkout";

export const dynamic = "force-dynamic";

/** Placeholder endpoint. Returns 503 until a payment provider, order storage and stock validation exist. */
export async function POST() {
  const status = getCheckoutStatus();
  if (!status.configured) {
    return NextResponse.json({ ok: false, error: "checkout_not_configured", message: status.reason }, { status: 503 });
  }
  return NextResponse.json({ ok: false, error: "not_implemented" }, { status: 501 });
}
