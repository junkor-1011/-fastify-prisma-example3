import fastify, { type FastifyInstance, type FastifyServerOptions } from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import fastifySensible from '@fastify/sensible';
import fs from 'fs';
import { type JsonSchema, withRefResolver } from 'fastify-zod';
import { errorResponseSchemas } from '@/modules/_common/error-responses.schema.js';
import { userSchemas } from '@/modules/user/user.schema.js';
import userRoutes from '@/modules/user/user.route.js';
import { type PinoLoggerOptions } from 'fastify/types/logger.js';

export const buildApp = async (opts: FastifyServerOptions = {}): Promise<FastifyInstance> => {
  const genLoggerOption = (): PinoLoggerOptions | boolean => {
    const { STAGE } = process.env;
    if (STAGE === 'LOCAL' || STAGE === 'DEBUG') {
      const opts = {
        transport: {
          target: 'pino-pretty', // TODO: may not be used in production environment because of performance
          options: {
            translateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",
            colorlize: true,
          },
        },
      } as const satisfies PinoLoggerOptions;
      return opts;
    }
    if (STAGE === 'TEST') {
      return false;
    }
    // default
    return true;
  };
  const server = fastify({
    logger: genLoggerOption(),
    ajv: {
      customOptions: {
        strict: 'log',
        keywords: ['example'],
      },
    },
    ...opts,
  });

  await server.register(fastifySensible);

  const registerSchemas = (...schemasList: JsonSchema[][]): void => {
    schemasList.forEach((schemas) => {
      schemas.forEach((schema) => {
        server.addSchema(schema);
      });
    });
  };
  registerSchemas(errorResponseSchemas, userSchemas);
  await server.register(
    swagger,
    withRefResolver({
      openapi: {
        info: {
          title: 'Fastify Example',
          description: 'fastify zod example',
          version: '0.0.1',
        },
        components: {
          securitySchemes: {
            apiKey: {
              type: 'apiKey',
              name: 'Authorization',
              in: 'header',
            },
          },
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

  const swaggerFlg: boolean = process.env.STAGE === 'LOCAL';
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
