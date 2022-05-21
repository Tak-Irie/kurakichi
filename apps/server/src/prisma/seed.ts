/* eslint-disable no-restricted-syntax */
import { PrismaClient } from '@prisma/client';
import { orgs, users } from './seedData';

const prisma = new PrismaClient();

async function main() {
  const usersCreate = [];
  const orgsCreate = [];

  for (const user of users) {
    console.log('user:', user);
    usersCreate.push(prisma.user.create({ data: user }));
  }
  await Promise.all(usersCreate);

  for (const org of orgs) {
    console.log('org:', org);
    orgsCreate.push(
      prisma.organization.create({
        data: org,
        include: {
          members: { where: { id: org.adminId } },
        },
      }),
    );
  }
  await Promise.all(orgsCreate);
  console.log('done');
  // console.log('setting seedData');
  // users.forEach((user) => {
  //   prisma.user.create({ data: user });
  // });

  // orgs.forEach((org) => {
  //   prisma.organization.create({
  //     data: org,
  //     include: {
  //       members: { where: { id: org.adminId } },
  //     },
  //   });
  // });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
