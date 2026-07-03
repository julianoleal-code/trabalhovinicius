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

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  try {
    const payload = verifyToken(token) as { sub?: string };
    const { id } = await params;
    const body = await request.json();
    const missingFields = getMissingCardFields(body as Record<string, unknown>);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Campos obrigatórios ausentes: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    const card = await prisma.pokemonCard.updateMany({
      where: { id, userId: payload.sub },
      data: {
        name: body.name,
        type: body.type,
        hp: body.hp,
        attack: body.attack,
        description: body.description,
        image: body.image,
        rarity: body.rarity,
      },
    });

    return NextResponse.json(card);
  } catch {
    return NextResponse.json({ error: "Não foi possível editar o card." }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  try {
    const payload = verifyToken(token) as { sub?: string };
    const { id } = await params;
    await prisma.pokemonCard.deleteMany({ where: { id, userId: payload.sub } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Não foi possível excluir o card." }, { status: 400 });
  }
}
