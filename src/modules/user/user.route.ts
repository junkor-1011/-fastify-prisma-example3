/* eslint-disable @typescript-eslint/require-await */

import { type FastifyInstance } from 'fastify';
import {
  createUserHandler,
  deleteUserHandler,
  getUserHandler,
  getUsersHandler,
  patchUserHandler,
  putUserHandler,
} from './user.controller.js';
import { errorResponseJsonSchemaBase } from '@/modules/_common/error-responses.schema.js';
import { $ref } from './user.schema.js';

const userRoutes = async (server: FastifyInstance): Promise<void> => {
  server.post('/', {
    schema: {
      description: 'create user resource',
      security: [{ apiKey: [] }],
      body: $ref('userInputSchema'),
      response: {
        201: { ...$ref('userSchema'), description: 'user was created' },
        ...errorResponseJsonSchemaBase,
      },
      tags: ['User'],
    },
    handler: createUserHandler,
  });
  server.get('/', {
    schema: {
      description: 'get users information list',
      querystring: $ref('getUsersQuerySchema'),
      response: {
        200: { ...$ref('userListSchema'), description: 'users' },
        ...errorResponseJsonSchemaBase,
      },
      tags: ['User'],
    },
    handler: getUsersHandler,
  });
  server.get('/:id', {
    schema: {
      description: 'get user detail info',
      params: $ref('getUserParamsSchema'),
      response: {
        200: {
          ...$ref('userSchema'),
          description: 'user detail',
        },
        ...errorResponseJsonSchemaBase,
      },
      tags: ['User'],
    },
    handler: getUserHandler,
  });
  server.delete('/:id', {
    schema: {
      description: 'delete user resource',
      security: [{ apiKey: [] }],
      params: $ref('deleteUserParamsSchema'),
      response: {
        204: {
          type: 'null',
          description: 'deleted user successfully',
        },
        ...errorResponseJsonSchemaBase,
      },
      tags: ['User'],
    },
    handler: deleteUserHandler,
  });
  server.patch('/:id', {
    schema: {
      description: 'change user resource',
      security: [{ apiKey: [] }],
      params: $ref('patchUserParamsSchema'),
      body: $ref('patchUserRequestBodySchema'),
      response: {
        200: {
          ...$ref('userSchema'),
          description: 'user detail',
        },
        ...errorResponseJsonSchemaBase,
      },
      tags: ['User'],
    },
    handler: patchUserHandler,
  });
  server.put('/:id', {
    schema: {
      description: 'create or update user',
      security: [{ apiKey: [] }],
      params: $ref('putUserParamsSchema'),
      body: $ref('putUserRequestBodySchema'),
      response: {
        200: {
          ...$ref('userSchema'),
          description: 'user detail',
        },
        ...errorResponseJsonSchemaBase,
      },
      tags: ['User'],
    },
    handler: putUserHandler,
  });
};
export default userRoutes;
