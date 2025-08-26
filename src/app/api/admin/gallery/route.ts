import { NextResponse } from "next/server";
import { prisma } from "@/lib/Prisma";

export async function GET() {
  try {
    const albums = await prisma.photoAlbum.findMany({
      where: { isPublic: true },
      include: {
        photos: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(albums);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
  }
}