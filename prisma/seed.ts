import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    id: 'b779545c-6c21-47a4-b087-e70985e57af1',
    name: 'Alice',
    email: 'alice@example.com',
    rank: 1,
    birthdate: '2022-12-04T13:07:58.786Z',
    createdAt: '2022-12-04T13:08:18.653Z',
    updatedAt: '2022-12-04T13:08:18.653Z',
  },
  {
    id: 'b779545c-6c21-47a4-b087-e70985e57af2',
    name: 'Bob',
    email: 'bob@example.com',
    rank: 3,
    birthdate: '2022-11-04T13:07:58.000Z',
    createdAt: '2022-11-04T13:08:18.000Z',
    updatedAt: '2022-11-04T13:08:18.000Z',
  },
  {
    id: 'a779545c-6c21-47a4-b087-e70985e57aff',
    name: '富士山',
    email: 'hoge@example.com',
    rank: 1,
    birthdate: '2021-12-04T13:07:58.786Z',
    createdAt: '2021-12-04T13:08:18.653Z',
    updatedAt: '2021-12-04T13:08:18.653Z',
  },
];

async function main(): Promise<void> {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
