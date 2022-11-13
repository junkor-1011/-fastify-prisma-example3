/* eslint-disable @typescript-eslint/require-await */

import { FastifyInstance } from 'fastify';
import { createUserHandler } from './user.controller';
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
};
export default userRoutes;
