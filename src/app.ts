import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import fs from 'fs';
import { JsonSchema, withRefResolver } from 'fastify-zod';
import { userSchemas } from '@/modules/user/user.schema';
import userRoutes from '@/modules/user/user.route';

export const buildApp = async (opts: FastifyServerOptions = {}): Promise<FastifyInstance> => {
  const server = fastify({
    logger: true,
    ajv: {
      customOptions: {
        strict: 'log',
        keywords: ['example'],
      },
    },
    ...opts,
  });

  const registerSchemas = (...schemasList: JsonSchema[][]): void => {
    schemasList.forEach((schemas) => {
      schemas.forEach((schema) => {
        server.addSchema(schema);
      });
    });
  };
  registerSchemas(userSchemas);
  await server.register(
    swagger,
    withRefResolver({
      openapi: {
        info: {
          title: 'Fastify Example',
          description: 'fastify zod example',
          version: '0.0.1',
        },
      },
    }),
  );

  await server.register(userRoutes, {
    prefix: '/users',
  });

  return await server;
};

export const app = async (): Promise<void> => {
  const server = await buildApp();

  const swaggerFlg: boolean = process.env.STAGE !== 'PRODUCTION';
  if (swaggerFlg) {
    await server.register(swaggerUI, {
      routePrefix: '/docs',
      staticCSP: true,
    });
  }

  try {
    await server.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Server listening on port 3000.');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  if (swaggerFlg) {
    const responseYaml = await server.inject('/docs/yaml');
    fs.writeFileSync('docs/openapi.yaml', responseYaml.payload);
  }
};
