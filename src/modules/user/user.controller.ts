import { v4 as uuidv4 } from 'uuid';
import type { FastifyReply, FastifyRequest } from 'fastify';

import {
  // userInputSchema,
  // userSchema,
  UserInputType,
  // UserType,
} from './user.schema';

export const createUserHandler = async (
  request: FastifyRequest<{ Body: UserInputType }>,
  reply: FastifyReply,
): Promise<void> => {
  const id = uuidv4();
  const date = new Date();

  await reply.code(201).send({
    id,
    name: request.body.name,
    email: request.body?.email,
    age: request.body?.age,
    createdAt: date,
    updatedAt: date,
  });
};
