import { prisma } from '@/lib/Prisma';

export async function GET() {
  const pendingAlumni = await prisma.alumniProfile.findMany({
    where: { status: 'APPROVAL_PENDING' },
    include: { user: true },
    orderBy: { createdAt: 'asc' },
  });

  return new Response(JSON.stringify({ alumni: pendingAlumni }), { status: 200 });
}

export async function POST(request: Request) {
  const { alumniId, status, remark } = await request.json();

  if (!alumniId || !['APPROVED', 'REJECTED'].includes(status)) {
    return new Response(JSON.stringify({ error: 'Invalid request.' }), { status: 400 });
  }

  const updateData: any = { status };
  if (status === 'REJECTED') {
    updateData.suggestions = remark || 'Rejected by admin'; // You can use a dedicated remark field if you add one
  }

  const updated = await prisma.alumniProfile.update({
    where: { id: alumniId },
    data: updateData,
  });

  return new Response(JSON.stringify({ alumni: updated }), { status: 200 });
}