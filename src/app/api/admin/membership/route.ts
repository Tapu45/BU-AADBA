import { prisma } from '@/lib/Prisma';

export async function POST(request: Request) {
  const body = await request.json();
  const {
    name,
    description,
    fee,
    durationMonths,
    benefits,
    isActive = true,
  } = body;

  if (!name || !description || !fee || !durationMonths || !benefits) {
    return new Response(JSON.stringify({ error: 'Missing required fields.' }), { status: 400 });
  }

  const tier = await prisma.membershipTier.create({
    data: {
      name,
      description,
      fee: Number(fee),
      durationMonths: Number(durationMonths),
      benefits,
      isActive,
    },
  });

  return new Response(JSON.stringify({ tier }), { status: 201 });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const {
    id,
    name,
    description,
    fee,
    durationMonths,
    benefits,
    isActive,
  } = body;

  if (!id) {
    return new Response(JSON.stringify({ error: 'Membership tier ID is required.' }), { status: 400 });
  }

  const updated = await prisma.membershipTier.update({
    where: { id },
    data: {
      name,
      description,
      fee: fee !== undefined ? Number(fee) : undefined,
      durationMonths: durationMonths !== undefined ? Number(durationMonths) : undefined,
      benefits,
      isActive,
    },
  });

  return new Response(JSON.stringify({ tier: updated }), { status: 200 });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  if (!id) {
    return new Response(JSON.stringify({ error: 'Membership tier ID is required.' }), { status: 400 });
  }

  await prisma.membershipTier.delete({
    where: { id },
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}

export async function GET() {
  try {
    const tiers = await prisma.membershipTier.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return new Response(JSON.stringify({ tiers }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch membership tiers.' }), { status: 500 });
  }
}