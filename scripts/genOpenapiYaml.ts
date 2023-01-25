/* eslint-disable @typescript-eslint/no-floating-promises */
import fs from 'fs';
import swaggerUI from '@fastify/swagger-ui';
import { buildApp } from '../src/app';

async function main(): Promise<void> {
  const server = await buildApp();
  await server.register(swaggerUI, {
    routePrefix: '/docs',
    staticCSP: true,
  });

  const res = await server.inject('/docs/yaml');
  fs.writeFileSync('docs/openapi.yaml', res.payload);
}
main();
