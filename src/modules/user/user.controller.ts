import { v4 as uuidv4 } from 'uuid';
import type { FastifyReply, FastifyRequest } from 'fastify';

import { prisma } from '../../libs/prisma';
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

  const record = {
    id,
    name: request.body.name,
    email: request.body?.email,
    age: request.body?.age,
    createdAt: date,
    updatedAt: date,
  };
  try {
    await prisma.user.create({
      data: record,
    });
  } catch (err) {
    console.log(err);
    await reply.code(500).send({
      message: 'Internal Server Error',
    });
  }

  await reply.code(201).send(record);
};
