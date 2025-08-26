import { prisma } from '@/lib/Prisma';

// Get all alumni registration requests with status "APPROVAL_PENDING"
export async function GET() {
  const requests = await prisma.alumniProfile.findMany({
    where: { status: 'APPROVAL_PENDING' },
    include: {
      user: {
        include: {
          memberships: {
            include: { tier: true }
          }
        }
      }
    },
    orderBy: { createdAt: 'desc' },
  });

  return new Response(JSON.stringify({ requests }), { status: 200 });
}

// Mark a request as accepted (status -> APPROVED)
export async function PUT(request: Request) {
  const { id, status } = await request.json();

  if (!id || !status || !["APPROVED", "REJECTED"].includes(status)) {
    return new Response(JSON.stringify({ error: 'AlumniProfile ID and valid status ("APPROVED" or "REJECTED") are required.' }), { status: 400 });
  }

  const updated = await prisma.alumniProfile.update({
    where: { id },
    data: { status },
  });

  return new Response(JSON.stringify({ success: true, profile: updated }), { status: 200 });
}