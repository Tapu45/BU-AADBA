import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/Prisma';
// GET: List all faculty members
export async function GET() {
  const members = await prisma.facultyMember.findMany();
  return NextResponse.json(members);
}

// POST: Create a new faculty member
export async function POST(req: NextRequest) {
  const { name, imageUrl, designation, status } = await req.json();
  if (!name  || !status) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  const member = await prisma.facultyMember.create({
    data: { name, imageUrl, designation, status }
  });
  return NextResponse.json(member, { status: 201 });
}

// PUT: Update a faculty member (expects id in body)
export async function PUT(req: NextRequest) {
  const { id, name, imageUrl, designation, status } = await req.json();
  if (!id) {
    return NextResponse.json({ error: 'Missing faculty member id' }, { status: 400 });
  }
  const member = await prisma.facultyMember.update({
    where: { id },
    data: { name, imageUrl, designation, status }
  });
  return NextResponse.json(member);
}

// DELETE: Delete a faculty member (expects id in body)
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({ error: 'Missing faculty member id' }, { status: 400 });
  }
  await prisma.facultyMember.delete({ where: { id } });
  return NextResponse.json({ success: true });
}