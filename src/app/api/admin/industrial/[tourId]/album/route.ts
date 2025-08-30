import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/Prisma';

export async function POST(req: NextRequest, { params }: { params: { tourId: string } }) {
  const { albumId } = await req.json();
  const { tourId } = params;
  const link = await prisma.industrialTourPhotoAlbum.create({
    data: { tourId, albumId }
  });
  return NextResponse.json(link);
}

export async function GET(req: NextRequest, { params }: { params: { tourId: string } }) {
  const { tourId } = params;
  const albums = await prisma.industrialTourPhotoAlbum.findMany({
    where: { tourId },
    include: { album: true }
  });
  return NextResponse.json(albums);
}

export async function DELETE(req: NextRequest, { params }: { params: { tourId: string } }) {
  const { albumId } = await req.json();
  const { tourId } = params;
  await prisma.industrialTourPhotoAlbum.delete({
    where: { tourId_albumId: { tourId, albumId } }
  });
  return NextResponse.json({ success: true });
}