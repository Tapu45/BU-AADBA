import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/Prisma";

export async function POST(req: NextRequest, { params }: { params: { tourId: string } }) {
  try {
    const body = await req.json(); // Expect: [{ imageUrl, caption }, ...]
    const { tourId } = params;

    // Create multiple photos for the tour
    const createdPhotos = await prisma.industrialTourPhoto.createMany({
      data: body.map((photo: any) => ({
        tourId,
        imageUrl: photo.imageUrl,
        caption: photo.caption,
        uploadedBy: photo.uploadedBy,
      })),
    });

    return NextResponse.json({ success: true, createdPhotos });
  } catch (error) {
    return NextResponse.json({ error: "Failed to upload photos" }, { status: 400 });
  }
}