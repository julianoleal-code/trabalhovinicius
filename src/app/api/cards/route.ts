import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

function getMissingCardFields(body: Record<string, unknown>) {
  const requiredFields = ["name", "type", "hp", "attack", "description", "image", "rarity"];

  return requiredFields.filter((field) => {
    const value = body[field];
    return typeof value !== "string" || value.trim() === "";
  });
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  try {
    const payload = verifyToken(token) as { sub?: string };
    const cards = await prisma.pokemonCard.findMany({
      where: { userId: payload.sub },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(cards);
  } catch {
    return NextResponse.json({ error: "Sessão inválida." }, { status: 401 });
  }
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  try {
    const payload = verifyToken(token) as { sub?: string };
    const body = await request.json();
    const missingFields = getMissingCardFields(body as Record<string, unknown>);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Campos obrigatórios ausentes: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    const card = await prisma.pokemonCard.create({
      data: {
        name: body.name,
        type: body.type,
        hp: body.hp,
        attack: body.attack,
        description: body.description,
        image: body.image,
        rarity: body.rarity,
        userId: payload.sub!,
      },
    });

    return NextResponse.json(card, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Não foi possível criar o card." }, { status: 400 });
  }
}
