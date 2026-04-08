import { NextResponse } from "next/server";

import { generateLivingStatus } from "@/actions/generateStatus";

export async function GET() {
  const status = await generateLivingStatus();
  return NextResponse.json({ status });
}

