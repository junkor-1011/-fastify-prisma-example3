import { v4 as uuidv4 } from 'uuid';
import type { FastifyReply, FastifyRequest } from 'fastify';

import { prisma } from '../../libs/prisma';
import {
  // userInputSchema,
  // userSchema,
  UserInputType,
  GetUsersQueryType,
  GetUserParamsType,
  PutUserParamsType,
  PutUserRequestBodyType,
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

export const getUserHandler = async (
  request: FastifyRequest<{ Params: GetUserParamsType }>,
  reply: FastifyReply,
): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: request.params.id,
      },
    });
    await reply.code(200).send(user);
  } catch (err) {
    console.log(err);
    await reply.code(500).send({
      message: 'Internal Server Error',
    });
  }
};

export const getUsersHandler = async (
  request: FastifyRequest<{ Querystring: GetUsersQueryType }>,
  reply: FastifyReply,
): Promise<void> => {
  try {
    const users = await prisma.user.findMany({
      orderBy: [{ updatedAt: 'desc' }],
      take: request.query.limit ?? 100,
      skip: request.query.offset ?? 0,
    });
    await reply.code(200).send(users);
  } catch (err) {
    console.log(err);
    await reply.code(500).send({
      message: 'Internal Server Error',
    });
  }
};

export const deleteUserHandler = async (
  request: FastifyRequest<{ Params: GetUserParamsType }>,
  reply: FastifyReply,
): Promise<void> => {
  try {
    const user = await prisma.user.delete({
      where: {
        id: request.params.id,
      },
    });
    await reply.code(200).send(user);
  } catch (err) {
    console.log(err);
    await reply.code(500).send({
      message: 'Internal Server Error',
    });
  }
};

export const putUserHandler = async (
  request: FastifyRequest<{ Params: PutUserParamsType; Body: PutUserRequestBodyType }>,
  reply: FastifyReply,
): Promise<void> => {
  const data: { name?: string; email?: string; age?: number; updatedAt: Date } = {
    updatedAt: new Date(),
  };
  const { name, email, age } = request.body;
  if (name !== '') {
    data.name = name;
  }
  if (email !== undefined) {
    data.email = email;
  }
  if (age !== undefined) {
    data.age = age;
  }
  try {
    const user = await prisma.user.update({
      data,
      where: {
        id: request.params.id,
      },
    });
    await reply.code(200).send(user);
  } catch (err) {
    console.log(err);
    await reply.code(500).send({
      message: 'Internal Server Error',
    });
  }
};
