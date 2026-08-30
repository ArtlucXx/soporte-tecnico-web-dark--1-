import { NextRequest, NextResponse } from "next/server";
import { updateAbout } from "@/lib/db";
import { getSession } from "@/lib/session";

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { name, career, institution, year, bio } = await req.json();

  if (
    [name, career, institution, year, bio].some(
      (field) => typeof field !== "string" || field.trim() === ""
    )
  ) {
    return NextResponse.json(
      { error: "Todos los campos son obligatorios" },
      { status: 400 }
    );
  }

  await updateAbout({ name, career, institution, year, bio });
  return NextResponse.json({ ok: true });
}
