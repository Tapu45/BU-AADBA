// Seed script to create a default super admin user

import { prisma } from '../../src/lib/Prisma.js'
import { hash } from 'bcrypt';
async function main() {
  // Change these values as needed
  const adminEmail = 'admin.bu@email.com';
  const adminPassword = 'Admin@123'; // Use a strong password!
  const hashedPassword = await hash(adminPassword, 10);

  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log('Super admin already exists.');
    return;
  }

  // Create the admin user
  const adminUser = await prisma.user.create({
    data: {
      email: adminEmail,
      password: hashedPassword,
      role: 'ADMIN',
      isVerified: true,
      adminProfile: {
        create: {
          firstName: 'Super',
          lastName: 'Admin',
          position: 'Super Admin',
          department: 'Administration',
          bio: 'Default super admin account.',
          phoneNumber: '0000000000',
        },
      },
    },
    include: { adminProfile: true },
  });

  console.log('Super admin created:', adminUser);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });