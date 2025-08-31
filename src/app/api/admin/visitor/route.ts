import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// GET: List all visitors
export async function GET(req: NextRequest) {
  try {
    const visitors = await prisma.visitor.findMany();
    return NextResponse.json(visitors);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch visitors" }, { status: 500 });
  }
}

// POST: Create a new visitor
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const visitor = await prisma.visitor.create({
      data: {
        name: body.name,
        designation: body.designation,
        photoUrl: body.photoUrl,
        type: body.type,
      },
    });
    return NextResponse.json(visitor, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create visitor" }, { status: 400 });
  }
}

// PUT: Update a visitor by id
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updateData } = body;
    if (!id) {
      return NextResponse.json({ error: "Visitor id is required" }, { status: 400 });
    }
    const visitor = await prisma.visitor.update({
      where: { id },
      data: updateData,
    });
    return NextResponse.json(visitor);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update visitor" }, { status: 400 });
  }
}

// DELETE: Delete a visitor by id
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;
    if (!id) {
      return NextResponse.json({ error: "Visitor id is required" }, { status: 400 });
    }
    await prisma.visitor.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete visitor" }, { status: 400 });
  }
}