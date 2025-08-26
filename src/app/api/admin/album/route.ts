import { NextResponse } from "next/server";
import { prisma } from "@/lib/Prisma";

export async function POST(request: Request) {
  try {
    const { name, description } = await request.json();

    if (!name) {
      return NextResponse.json({ error: "Album name is required" }, { status: 400 });
    }

    const album = await prisma.photoAlbum.create({
      data: {
        title: name,
        description,
        albumDate: new Date(),
      },
    });

    return NextResponse.json({ id: album.id });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create album" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const albums = await prisma.photoAlbum.findMany({
      include: {
        photos: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ albums });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch albums" }, { status: 500 });
  }
}