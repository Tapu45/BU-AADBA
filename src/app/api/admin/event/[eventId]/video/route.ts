import { prisma } from '@/lib/Prisma';

// Upload a video to an event
export async function POST(request: Request, { params }: { params: { eventId: string } }) {
  const { eventId } = params;
  const body = await request.json();
  const { title, description, videoUrl, thumbnailUrl, duration, isPublic = true } = body;

  if (!title || !videoUrl) {
    return new Response(JSON.stringify({ error: 'Missing required fields.' }), { status: 400 });
  }

  const video = await prisma.video.create({
    data: {
      title,
      description,
      videoUrl,
      thumbnailUrl,
      duration,
      isPublic,
      event: { connect: { id: eventId } },
    },
  });

  return new Response(JSON.stringify({ video }), { status: 201 });
}

// Get all videos for an event
export async function GET(request: Request, { params }: { params: { eventId: string } }) {
  const { eventId } = params;

  const videos = await prisma.video.findMany({
    where: { eventId },
    orderBy: { uploadDate: 'desc' },
  });

  return new Response(JSON.stringify({ videos }), { status: 200 });
}

// Update a video (requires videoId in body)
export async function PUT(request: Request, { params }: { params: { eventId: string } }) {
  const { videoId, title, description, videoUrl, thumbnailUrl, duration, isPublic } = await request.json();

  if (!videoId) {
    return new Response(JSON.stringify({ error: 'videoId is required.' }), { status: 400 });
  }

  const updated = await prisma.video.update({
    where: { id: videoId },
    data: {
      title,
      description,
      videoUrl,
      thumbnailUrl,
      duration,
      isPublic,
    },
  });

  return new Response(JSON.stringify({ video: updated }), { status: 200 });
}

// Delete a video (requires videoId in body)
export async function DELETE(request: Request, { params }: { params: { eventId: string } }) {
  const { videoId } = await request.json();

  if (!videoId) {
    return new Response(JSON.stringify({ error: 'videoId is required.' }), { status: 400 });
  }

  await prisma.video.delete({
    where: { id: videoId },
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}