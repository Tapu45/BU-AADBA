import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/Prisma';

// GET: List all newspaper clippings
export async function GET() {
  const clippings = await prisma.newspaperClipping.findMany();
  return NextResponse.json(clippings);
}

// POST: Create a new newspaper clipping
export async function POST(req: NextRequest) {
  const { title, imageUrl } = await req.json();
  if (!title || !imageUrl) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  const clipping = await prisma.newspaperClipping.create({
    data: { title, imageUrl }
  });
  return NextResponse.json(clipping, { status: 201 });
}

// PUT: Update a newspaper clipping (expects id in body)
export async function PUT(req: NextRequest) {
  const { id, title, imageUrl } = await req.json();
  if (!id) {
    return NextResponse.json({ error: 'Missing clipping id' }, { status: 400 });
  }
  const clipping = await prisma.newspaperClipping.update({
    where: { id },
    data: { title, imageUrl }
  });
  return NextResponse.json(clipping);
}

// DELETE: Delete a newspaper clipping (expects id in body)
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({ error: 'Missing clipping id' }, { status: 400 });
  }
  await prisma.newspaperClipping.delete({ where: { id } });
  return NextResponse.json({ success: true });
}