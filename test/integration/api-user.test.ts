import { buildApp } from '@/app';
import { prisma } from '@/libs/prisma';

const userTestData = [
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

beforeEach(async () => {
  jest.useRealTimers(); // to avoid fastify.inject stopping
  await prisma.$transaction([
    prisma.user.deleteMany(),
    prisma.user.createMany({ data: userTestData }),
  ]);
}, 5000);

afterEach(async () => {
  await prisma.$transaction([prisma.user.deleteMany()]);
}, 5000);

describe('GET /users', () => {
  it('get records', async () => {
    jest.useRealTimers();
    const app = await buildApp();
    const response = await app.inject('/users');
    // smoke test
    expect(response.statusCode).toBe(200);
    // check record
    expect(response.json()).toEqual(userTestData);
  }, 5000);
});
