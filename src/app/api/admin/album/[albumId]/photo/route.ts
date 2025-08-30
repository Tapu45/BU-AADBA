import { prisma } from '@/lib/Prisma';

// Upload a photo to an album
export async function POST(request: Request, { params }: { params: { albumId: string } }) {
  const { albumId } = await params; // <-- await here
  const body = await request.json();
  const { imageUrl, caption, isPublic = true } = body;

  if (!imageUrl) {
    return new Response(JSON.stringify({ error: 'Missing required fields.' }), { status: 400 });
  }

  const photo = await prisma.photo.create({
    data: {
      albumId,
      imageUrl,
      caption,
      isPublic,
    },
  });

  return new Response(JSON.stringify({ photo }), { status: 201 });
}

// Get all photos in an album
export async function GET(request: Request, { params }: { params: { albumId: string } }) {
  const { albumId } = params;

  const photos = await prisma.photo.findMany({
    where: { albumId },
    orderBy: { uploadDate: 'desc' },
  });

  return new Response(JSON.stringify({ photos }), { status: 200 });
}

// Update a photo in an album (requires photoId in body)
export async function PUT(request: Request, { params }: { params: { albumId: string } }) {
  const { photoId, imageUrl, caption, isPublic } = await request.json();

  if (!photoId) {
    return new Response(JSON.stringify({ error: 'photoId is required.' }), { status: 400 });
  }

  const updated = await prisma.photo.update({
    where: { id: photoId },
    data: {
      imageUrl,
      caption,
      isPublic,
    },
  });

  return new Response(JSON.stringify({ photo: updated }), { status: 200 });
}

// Delete a photo from an album (requires photoId in body)
export async function DELETE(request: Request, { params }: { params: { albumId: string } }) {
  const { photoId } = await request.json();

  if (!photoId) {
    return new Response(JSON.stringify({ error: 'photoId is required.' }), { status: 400 });
  }

  await prisma.photo.delete({
    where: { id: photoId },
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}