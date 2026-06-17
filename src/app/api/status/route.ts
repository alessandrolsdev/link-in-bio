import { NextResponse } from "next/server";

import { getCurrentFocusStatus } from "@/lib/current-focus";

export async function GET() {
  const status = await getCurrentFocusStatus();
  return NextResponse.json({ status });
}

