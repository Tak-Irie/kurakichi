/* eslint-disable no-restricted-syntax */
import { PrismaClient } from '@prisma/client';
import {
  adminUserId,
  memberUserId,
  orgs,
  sampleAdminId,
  sampleMemberId,
  sampleOrg,
  users,
} from './seedData';

const prisma = new PrismaClient();

async function main() {
  const usersCreate = [];
  const orgsCreate = [];

  for (const user of users) {
    usersCreate.push(prisma.user.create({ data: user }));
  }

  await Promise.all(usersCreate);
  console.log('seed user registered');

  for (const org of orgs) {
    orgsCreate.push(
      prisma.organization.create({
        data: {
          members: { connect: [{ id: adminUserId }, { id: memberUserId }] },
          ...org,
        },
      }),
    );
  }

  orgsCreate.push(
    prisma.organization.create({
      data: {
        members: { connect: [{ id: sampleAdminId }, { id: sampleMemberId }] },
        ...sampleOrg,
      },
    }),
  );

  await Promise.all(orgsCreate);
  console.log('seed org registered');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('seeding done');
  });
