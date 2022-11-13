/* eslint-disable @typescript-eslint/require-await */

import { FastifyInstance } from 'fastify';
import { createUserHandler, getUsersHandler } from './user.controller';
import { $ref } from './user.schema';

const userRoutes = async (server: FastifyInstance): Promise<void> => {
  server.post('/', {
    schema: {
      body: $ref('userInputSchema'),
      response: {
        201: { ...$ref('userSchema'), description: 'user was created' },
      },
      tags: ['User'],
    },
    handler: createUserHandler,
  });
  server.get('/', {
    schema: {
      querystring: $ref('getUsersQuerySchema'),
      response: {
        200: { ...$ref('userListSchema'), description: 'users' },
      },
      tags: ['User'],
    },
    handler: getUsersHandler,
  });
};
export default userRoutes;
