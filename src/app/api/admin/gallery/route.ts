import { NextResponse } from "next/server";
import { prisma } from "@/lib/Prisma";

// GET: List all gallery sections with their photos
export async function GET() {
  try {
    const sections = await prisma.gallerySection.findMany({
      include: {
        photos: {
          where: { isPublic: true },
          orderBy: { uploadDate: "desc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(sections);
  } catch (error) {
    console.error("GET /api/admin/gallery error:", error);
    return NextResponse.json({ error: "Failed to fetch gallery sections" }, { status: 500 });
  }
}

// POST: Create a new section or photo
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Create a new section
    if (body.type === "section") {
      const { title, description } = body;
      if (!title) {
        return NextResponse.json({ error: "Section title is required" }, { status: 400 });
      }
      const section = await prisma.gallerySection.create({
        data: { title, description },
      });
      return NextResponse.json(section, { status: 201 });
    }

    // Add a photo to a section
    if (body.type === "photo") {
      const { sectionId, imageUrl, caption, uploadedBy, isPublic } = body;
      if (!sectionId || !imageUrl) {
        return NextResponse.json({ error: "sectionId and imageUrl are required" }, { status: 400 });
      }
      const photo = await prisma.galleryPhoto.create({
        data: {
          sectionId,
          imageUrl,
          caption,
          uploadedBy,
          isPublic: isPublic !== undefined ? isPublic : true,
        },
      });
      return NextResponse.json(photo, { status: 201 });
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (error) {
    console.error("POST /api/admin/gallery error:", error);
    return NextResponse.json({ error: "Failed to create gallery item" }, { status: 500 });
  }
}

// DELETE: Delete a section or photo
export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    // Delete a section and its photos
    if (body.type === "section") {
      const { sectionId } = body;
      if (!sectionId) {
        return NextResponse.json({ error: "sectionId is required" }, { status: 400 });
      }
      await prisma.gallerySection.delete({
        where: { id: sectionId },
      });
      return NextResponse.json({ success: true });
    }

    // Delete a photo
    if (body.type === "photo") {
      const { photoId } = body;
      if (!photoId) {
        return NextResponse.json({ error: "photoId is required" }, { status: 400 });
      }
      await prisma.galleryPhoto.delete({
        where: { id: photoId },
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (error) {
    console.error("DELETE /api/admin/gallery error:", error);
    return NextResponse.json({ error: "Failed to delete gallery item" }, { status: 500 });
  }
}