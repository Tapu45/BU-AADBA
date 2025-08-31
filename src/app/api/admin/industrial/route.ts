import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/Prisma';

export async function GET() {
  try {
    const tours = await prisma.industrialTour.findMany({
      include: {
        photos: true, // Directly include photos
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
  // data.photos should be an array of { imageUrl, caption, uploadedBy }
  const tour = await prisma.industrialTour.create({
    data: {
      title: data.title,
      year: data.year,
      description: data.description,
      coverImage: data.coverImage,
      createdBy: data.createdBy,
      photos: data.photos
        ? {
            create: data.photos.map((photo: any) => ({
              imageUrl: photo.imageUrl,
              caption: photo.caption,
              uploadedBy: photo.uploadedBy,
            })),
          }
        : undefined,
    },
    include: {
      photos: true,
    },
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

  // Delete associated photos first (if not handled by onDelete: Cascade in schema)
  await prisma.industrialTourPhoto.deleteMany({
    where: { tourId: id }
  });

  await prisma.industrialTour.delete({ where: { id } });
  return NextResponse.json({ success: true });
}