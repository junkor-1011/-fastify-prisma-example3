import { PrismaClient } from '@prisma/client';
export const _prisma = new PrismaClient({
  log: [
    // TODO: switch by env
    'query',
    'info',
    'warn',
    'error',
  ],
});

// eslint-disable-next-line @typescript-eslint/require-await
const buildClient = async (): Promise<PrismaClient> => {
  // TODO: fetch the setting from remote data source.
  const client = new PrismaClient({
    log: [
      // TODO: switch by env
      'query',
      'info',
      'warn',
      'error',
    ],
  });
  return client;
};

export const prisma = await buildClient();
