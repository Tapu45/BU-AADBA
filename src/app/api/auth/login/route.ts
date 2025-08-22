import { prisma } from '@/lib/Prisma';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Use a strong secret in production

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return new Response(JSON.stringify({ error: 'Email and password are required.' }), { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email },
    include: { adminProfile: true, alumniProfile: true },
  });

  if (!user) {
    return new Response(JSON.stringify({ error: 'Invalid credentials.' }), { status: 401 });
  }

  const valid = await compare(password, user.password);
  if (!valid) {
    return new Response(JSON.stringify({ error: 'Invalid credentials.' }), { status: 401 });
  }

  // Check alumni approval status
  if (
    user.role === 'ALUMNI' &&
    (!user.alumniProfile || user.alumniProfile.status !== 'APPROVED')
  ) {
    return new Response(JSON.stringify({ error: 'Your registration is not approved yet.' }), { status: 403 });
  }

  // Remove password before sending user data
  const { password: _, ...userWithoutPassword } = user;

  // Create JWT token
  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
 return new Response(JSON.stringify({ user: userWithoutPassword, token }), { status: 200 });
}