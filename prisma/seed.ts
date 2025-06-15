// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: 'guest@example.com' },
    update: {},
    create: {
      name: 'Guest User',
      email: 'guest@example.com',
      image: null,
      // role: 'GUEST', などあれば
    },
  });

  console.log('✅ Guest user created');
}

main().finally(() => prisma.$disconnect());
