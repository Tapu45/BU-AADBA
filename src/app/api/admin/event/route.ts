import { prisma } from '@/lib/Prisma';

export async function POST(request: Request) {
  const body = await request.json();
  const {
    title,
    description,
    eventType,
    startDate,
    endDate,
    location,
    venue,
    isOnline = false,
    meetingLink,
    meetingPassword,
    capacity,
    registrationFee,
    registrationStartDate,
    registrationEndDate,
    isFeatured = false,
    coverImage,
    createdBy,
    albumId,
    isPublished = false,
  } = body;

  if (!title || !description || !eventType || !startDate || !endDate) {
    return new Response(JSON.stringify({ error: 'Missing required fields.' }), { status: 400 });
  }

  const event = await prisma.event.create({
    data: {
      title,
      description,
      eventType,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      location,
      venue,
      isOnline,
      meetingLink,
      meetingPassword,
      capacity,
      registrationFee,
      registrationStartDate: registrationStartDate ? new Date(registrationStartDate) : undefined,
      registrationEndDate: registrationEndDate ? new Date(registrationEndDate) : undefined,
      isFeatured,
      coverImage,
      createdBy,
      albumId,
      isPublished,
    },
  });

  return new Response(JSON.stringify({ event }), { status: 201 });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const {
    id,
    title,
    description,
    eventType,
    startDate,
    endDate,
    location,
    venue,
    isOnline,
    meetingLink,
    meetingPassword,
    capacity,
    registrationFee,
    registrationStartDate,
    registrationEndDate,
    isFeatured,
    coverImage,
    createdBy,
    albumId,
    isPublished,
  } = body;

  if (!id) {
    return new Response(JSON.stringify({ error: 'Event ID is required.' }), { status: 400 });
  }

  const updated = await prisma.event.update({
    where: { id },
    data: {
      title,
      description,
      eventType,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      location,
      venue,
      isOnline,
      meetingLink,
      meetingPassword,
      capacity,
      registrationFee,
      registrationStartDate: registrationStartDate ? new Date(registrationStartDate) : undefined,
      registrationEndDate: registrationEndDate ? new Date(registrationEndDate) : undefined,
      isFeatured,
      coverImage,
      createdBy,
      albumId,
      isPublished,
    },
  });

  return new Response(JSON.stringify({ event: updated }), { status: 200 });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  if (!id) {
    return new Response(JSON.stringify({ error: 'Event ID is required.' }), { status: 400 });
  }

  await prisma.event.delete({
    where: { id },
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}