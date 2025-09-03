import { NextResponse } from "next/server";
import { prisma } from "@/lib/Prisma";

// GET all placement brochures
export async function GET() {
  try {
    const brochures = await prisma.placementBrochure.findMany({ orderBy: { year: "desc" } });
    return NextResponse.json(brochures);
  } catch (error) {
    console.error("GET /api/admin/placement error:", error);
    return NextResponse.json({ error: "Failed to fetch placement brochures" }, { status: 500 });
  }
}

// POST create a placement brochure
export async function POST(req: Request) {
  try {
    const { name, year, cover, file } = await req.json();
    if (!name || !year) {
      return NextResponse.json({ error: "Name and year are required" }, { status: 400 });
    }
    const brochure = await prisma.placementBrochure.create({
      data: { name, year, cover, file },
    });
    return NextResponse.json(brochure, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/placement error:", error);
    return NextResponse.json({ error: "Failed to create placement brochure" }, { status: 500 });
  }
}

// PUT update a placement brochure
export async function PUT(req: Request) {
  try {
    const { id, name, year, cover, file } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Brochure id is required" }, { status: 400 });
    }
    const brochure = await prisma.placementBrochure.update({
      where: { id },
      data: { name, year, cover, file },
    });
    return NextResponse.json(brochure);
  } catch (error) {
    console.error("PUT /api/admin/placement error:", error);
    return NextResponse.json({ error: "Failed to update placement brochure" }, { status: 500 });
  }
}

// DELETE a placement brochure
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Brochure id is required" }, { status: 400 });
    }
    await prisma.placementBrochure.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/placement error:", error);
    return NextResponse.json({ error: "Failed to delete placement brochure" }, { status: 500 });
  }
}