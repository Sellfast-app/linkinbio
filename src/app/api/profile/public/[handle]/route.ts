import { NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL?.trim().replace(/\/+$/, "");

export async function GET(_request: Request, context: { params: Promise<{ handle: string }> }) {
  const { handle } = await context.params;
  if (!API_BASE) return NextResponse.json({ message: "API is not configured" }, { status: 503 });
  try {
    const response = await fetch(`${API_BASE}/api/linkinbio/public/${encodeURIComponent(handle)}`, { cache: "no-store" });
    return NextResponse.json(await response.json(), { status: response.status });
  } catch {
    return NextResponse.json({ message: "Unable to load profile" }, { status: 502 });
  }
}
