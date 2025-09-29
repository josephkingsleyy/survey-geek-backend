import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Sample users
  const users = [
    {
      email: 'alice@example.com',
      username: 'alice',
      password: 'password123',
      firstName: 'Alice',
      lastName: 'Johnson',
      isActive: true,
    },
    {
      email: 'bob@example.com',
      username: 'bob',
      password: 'password123',
      firstName: 'Bob',
      lastName: 'Smith',
      isActive: true,
    },
    {
      email: 'charlie@example.com',
      username: 'charlie',
      password: 'password123',
      firstName: 'Charlie',
      lastName: 'Brown',
      isActive: false,
    },
  ];

  for (const userData of users) {
    const hashedPassword = await hash(userData.password, 10);

    await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        ...userData,
        password: hashedPassword,
        createdAt: new Date(),
      },
    });
  }

  console.log('✅ Users seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
