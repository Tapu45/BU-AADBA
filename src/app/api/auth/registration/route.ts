import { prisma } from '@/lib/Prisma';
import { hash } from 'bcrypt';

export async function POST(request: Request) {
  const body = await request.json();
  const {
    email,
    password,
    firstName,
    lastName,
    graduationYear,
    department,
    degree,
    phoneNumber,
    alternateEmail,
    address, // Present Address
    suggestions,
    contributionNotes,
    yearOfJoining,
    registrationTransactionId,
    registrationPaymentDate,
    membershipTierId, // <-- Membership plan selected by user
  } = body;

  if (
    !email ||
    !password ||
    !firstName ||
    !lastName ||
    !graduationYear ||
    !department ||
    !degree ||
    !membershipTierId
  ) {
    return new Response(JSON.stringify({ error: 'Missing required fields.' }), { status: 400 });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return new Response(JSON.stringify({ error: 'Email already registered.' }), { status: 409 });
  }

  const hashedPassword = await hash(password, 10);

  // Create user and alumni profile
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: 'ALUMNI',
      isVerified: false,
      alumniProfile: {
        create: {
          firstName,
          lastName,
          graduationYear: Number(graduationYear),
          department,
          degree,
          phoneNumber,
          alternateEmail,
          location: address,
          suggestions,
          contributionNotes,
          yearOfJoining: yearOfJoining ? Number(yearOfJoining) : undefined,
          registrationTransactionId,
          registrationPaymentDate: registrationPaymentDate ? new Date(registrationPaymentDate) : undefined,
          status: 'APPROVAL_PENDING',
        },
      },
    },
    include: { alumniProfile: true },
  });

  // Create membership record for the user
  const tier = await prisma.membershipTier.findUnique({ where: { id: membershipTierId } });
  if (!tier) {
    return new Response(JSON.stringify({ error: 'Invalid membership plan.' }), { status: 400 });
  }

  // Only set endDate if durationMonths is truthy
  const membershipData: any = {
    userId: user.id,
    tierId: tier.id,
    startDate: new Date(),
    membershipNumber: `ALUMNI-${Date.now()}`,
    paymentStatus: 'COMPLETED',
    amountPaid: tier.fee,
    isActive: true,
  };

  if (tier.durationMonths) {
    membershipData.endDate = new Date(new Date().setMonth(new Date().getMonth() + tier.durationMonths));
  }

  await prisma.membership.create({ data: membershipData });

  // Remove password before sending user data
  const { password: _, ...userWithoutPassword } = user;

  return new Response(JSON.stringify({ user: userWithoutPassword }), { status: 201 });
}