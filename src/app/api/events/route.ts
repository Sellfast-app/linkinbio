import { NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL?.trim().replace(/\/+$/, "");

export async function POST(request: Request) {
  if (!API_BASE) return NextResponse.json({ message: "API is not configured" }, { status: 503 });
  try {
    const response = await fetch(`${API_BASE}/api/linkinbio/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: await request.text(),
      cache: "no-store",
    });
    return NextResponse.json(await response.json(), { status: response.status });
  } catch {
    return NextResponse.json({ message: "Unable to record event" }, { status: 502 });
  }
}
