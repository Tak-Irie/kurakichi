import { PrismaClient } from '@prisma/client';

import { orgs, users } from './seedData';

const prisma = new PrismaClient();

async function main() {
  for (const user of users) {
    await prisma.user.create({ data: user });
  }
  for (const org of orgs) {
    await prisma.organization.create({
      data: org,
      include: {
        members: { where: { id: org.adminId } },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
