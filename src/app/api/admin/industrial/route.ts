import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/Prisma';

export async function GET() {
  try {
    const tours = await prisma.industrialTour.findMany({
      include: {
        photoAlbums: {
          include: {
            album: {
              include: { photos: true } // <-- Add this line
            }
          }
        }
      },
      orderBy: { year: 'desc' }
    });
    return NextResponse.json(tours);
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const tour = await prisma.industrialTour.create({
    data: {
      title: data.title,
      year: data.year,
      description: data.description,
      coverImage: data.coverImage,
      createdBy: data.createdBy
    }
  });
  return NextResponse.json(tour);
}

export async function PATCH(req: NextRequest) {
  const { id, ...data } = await req.json();
  if (!id) return NextResponse.json({ error: 'Missing tour id' }, { status: 400 });

  const tour = await prisma.industrialTour.update({
    where: { id },
    data
  });
  return NextResponse.json(tour);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'Missing tour id' }, { status: 400 });

  await prisma.industrialTour.delete({ where: { id } });
  return NextResponse.json({ success: true });
}