import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const payload = verifyToken(token) as { sub?: string; email?: string; name?: string };
    return NextResponse.json({ user: { id: payload.sub, email: payload.email, name: payload.name } });
  } catch {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
