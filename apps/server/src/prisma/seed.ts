import { PrismaClient } from '@prisma/client';

import { orgs, users } from './seedData';

const prisma = new PrismaClient();

async function main() {
  console.log('setting seedData');
  users.forEach((user) => {
    prisma.user.create({ data: user });
  });
  orgs.forEach((org) => {
    prisma.organization.create({
      data: org,
      include: {
        members: { where: { id: org.adminId } },
      },
    });
  });
  console.log('done');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
