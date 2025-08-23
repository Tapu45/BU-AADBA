import { prisma } from '@/lib/Prisma';

export async function POST(request: Request) {
  const body = await request.json();
  const {
    title,
    description,
    publicationDate,
    coverImage,
    fileUrl,
    author,
    editor,
    volume,
    issue,
    createdBy,
    isPublic = true,
    pageCount,
  } = body;

  if (!title || !fileUrl || !publicationDate) {
    return new Response(JSON.stringify({ error: 'Missing required fields.' }), { status: 400 });
  }

  const data: any = {
    title,
    type: 'NEWSLETTER',
    description,
    publicationDate: new Date(publicationDate),
    coverImage,
    fileUrl,
    author,
    editor,
     volume: volume !== undefined ? String(volume) : undefined, // <-- convert to string
    issue: issue !== undefined ? String(issue) : undefined,   // <-- convert to string
    isPublic,
    pageCount,
  };
  if (createdBy) {
    data.createdBy = createdBy;
  }

  const newsletter = await prisma.publication.create({
    data,
  });

  return new Response(JSON.stringify({ newsletter }), { status: 201 });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const {
    id,
    title,
    description,
    publicationDate,
    coverImage,
    fileUrl,
    author,
    editor,
    volume,
    issue,
    isPublic,
    pageCount,
  } = body;

  if (!id) {
    return new Response(JSON.stringify({ error: 'Newsletter ID is required.' }), { status: 400 });
  }

  const updated = await prisma.publication.update({
    where: { id },
    data: {
      title,
      description,
      publicationDate: publicationDate ? new Date(publicationDate) : undefined,
      coverImage,
      fileUrl,
      author,
      editor,
      volume,
      issue,
      isPublic,
      pageCount,
    },
  });

  return new Response(JSON.stringify({ newsletter: updated }), { status: 200 });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  if (!id) {
    return new Response(JSON.stringify({ error: 'Newsletter ID is required.' }), { status: 400 });
  }

  await prisma.publication.delete({
    where: { id },
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    // Get a single newsletter by ID
    const newsletter = await prisma.publication.findUnique({
      where: { id },
    });
    if (!newsletter) {
      return new Response(JSON.stringify({ error: 'Newsletter not found.' }), { status: 404 });
    }
    return new Response(JSON.stringify({ newsletter }), { status: 200 });
  }

  // Get all newsletters
  const newsletters = await prisma.publication.findMany({
    where: { type: 'NEWSLETTER' },
    orderBy: { publicationDate: 'desc' },
  });

  return new Response(JSON.stringify({ newsletters }), { status: 200 });
}