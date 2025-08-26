import { prisma } from '@/lib/Prisma';

// Create a new album for an event
export async function POST(request: Request, { params }: { params: { eventId: string } }) {
  const { eventId } = params;
  const body = await request.json();
  const { title, description, albumDate, coverImage, isPublic = true } = body;

  if (!title || !albumDate) {
    return new Response(JSON.stringify({ error: 'Missing required fields.' }), { status: 400 });
  }

  const album = await prisma.photoAlbum.create({
    data: {
      title,
      description,
      albumDate: new Date(albumDate),
      coverImage,
      isPublic,
      events: { create: [{ eventId }] }, // creates EventPhotoAlbum join
    },
    include: { events: true, photos: true },
  });

  return new Response(JSON.stringify({ album }), { status: 201 });
}

// Get all albums for an event
export async function GET(request: Request, { params }: { params: { eventId: string } }) {
  const { eventId } = params;

  const albums = await prisma.photoAlbum.findMany({
    where: {
      events: {
        some: { eventId },
      },
    },
    include: {
      photos: true,
      events: true,
    },
    orderBy: { albumDate: 'desc' },
  });

  return new Response(JSON.stringify({ albums }), { status: 200 });
}

// Delete an album for an event (deletes album and all photos)
export async function DELETE(request: Request, { params }: { params: { eventId: string } }) {
  const { albumId } = await request.json();

  if (!albumId) {
    return new Response(JSON.stringify({ error: 'albumId is required.' }), { status: 400 });
  }

  // This will delete the album and cascade delete all its photos and event links
  await prisma.photoAlbum.delete({
    where: { id: albumId },
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}

// Unlink an album from an event (removes only the join, not the album itself)
export async function PUT(request: Request, { params }: { params: { eventId: string } }) {
  const { albumId } = await request.json();

  if (!albumId) {
    return new Response(JSON.stringify({ error: 'albumId is required.' }), { status: 400 });
  }

  await prisma.eventPhotoAlbum.delete({
    where: {
      eventId_albumId: {
        eventId: params.eventId,
        albumId,
      },
    },
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}