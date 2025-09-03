import { NextResponse } from "next/server";
import { prisma } from "@/lib/Prisma";

// GET all conferences
export async function GET() {
  try {
    const conferences = await prisma.conference.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(conferences);
  } catch (error) {
    console.error("GET /api/admin/confress error:", error);
    return NextResponse.json({ error: "Failed to fetch conferences" }, { status: 500 });
  }
}

// POST create a conference
export async function POST(req: Request) {
  try {
    const { name, cover, file } = await req.json();
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    const conf = await prisma.conference.create({
      data: { name, cover, file },
    });
    return NextResponse.json(conf, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/confress error:", error);
    return NextResponse.json({ error: "Failed to create conference" }, { status: 500 });
  }
}

// PUT update a conference
export async function PUT(req: Request) {
  try {
    const { id, title, name, cover, file } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Conference id is required" }, { status: 400 });
    }
    const conf = await prisma.conference.update({
      where: { id },
      data: { name, cover, file },
    });
    return NextResponse.json(conf);
  } catch (error) {
    console.error("PUT /api/admin/confress error:", error);
    return NextResponse.json({ error: "Failed to update conference" }, { status: 500 });
  }
}

// DELETE a conference
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Conference id is required" }, { status: 400 });
    }
    await prisma.conference.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/confress error:", error);
    return NextResponse.json({ error: "Failed to delete conference" }, { status: 500 });
  }
}