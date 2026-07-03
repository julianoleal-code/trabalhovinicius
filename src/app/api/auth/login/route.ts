import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { comparePassword, signToken } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body as { email?: string; password?: string };

  if (!email || !password) {
    return NextResponse.json({ error: "Informe e-mail e senha." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: "Credenciais inválidas." }, { status: 401 });
  }

  const isValidPassword = await comparePassword(password, user.password);
  if (!isValidPassword) {
    return NextResponse.json({ error: "Credenciais inválidas." }, { status: 401 });
  }

  const token = signToken({ sub: user.id, email: user.email, name: user.name });
  const response = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } });
  response.cookies.set({
    name: "auth_token",
    value: token,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
