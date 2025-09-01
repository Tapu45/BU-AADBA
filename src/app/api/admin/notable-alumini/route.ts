import { NextResponse } from "next/server";
import { prisma } from "@/lib/Prisma";

// GET: List all notable alumni
export async function GET() {
  try {
    const alumni = await prisma.notableAlumni.findMany({
      orderBy: { batch: "desc" }
    });
    return NextResponse.json(alumni);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch notable alumni" }, { status: 500 });
  }
}

// POST: Create a new notable alumni
export async function POST(req: Request) {
  try {
    const { name, batch, designation, company, imageUrl } = await req.json();
    if (!name || !batch || !designation || !company) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const alumni = await prisma.notableAlumni.create({
      data: { name, batch, designation, company, imageUrl }
    });
    return NextResponse.json(alumni, { status: 201 });
  } catch (error) {
     console.error("POST /api/admin/notable-alumini error:", error);
    return NextResponse.json({ error: "Failed to create notable alumni" }, { status: 500 });
  }
}

// PUT: Update a notable alumni (expects id in body)
export async function PUT(req: Request) {
  try {
    const { id, name, batch, designation, company, imageUrl } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Missing alumni id" }, { status: 400 });
    }
    const alumni = await prisma.notableAlumni.update({
      where: { id },
      data: { name, batch, designation, company, imageUrl }
    });
    return NextResponse.json(alumni);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update notable alumni" }, { status: 500 });
  }
}

// DELETE: Delete a notable alumni (expects id in body)
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Missing alumni id" }, { status: 400 });
    }
    await prisma.notableAlumni.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete notable alumni" }, { status: 500 });
  }
}