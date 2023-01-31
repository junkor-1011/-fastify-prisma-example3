import { v4 as uuidv4 } from 'uuid';
import type { FastifyReply, FastifyRequest } from 'fastify';

import { prisma } from '@/libs/prisma.js';
import type { TAuthorizationHeaderObject } from '@/modules/_common/schemas/auth.js';
import type {
  // userInputSchema,
  // userSchema,
  UserInputType,
  GetUsersQueryType,
  GetUserParamsType,
  PatchUserParamsType,
  PatchUserRequestBodyType,
  PutUserParamsType,
  PutUserRequestBodyType,
  // UserType,
} from './user.schema.js';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

export const createUserHandler = async (
  request: FastifyRequest<{ Body: UserInputType; Headers: TAuthorizationHeaderObject }>,
  reply: FastifyReply,
): Promise<void> => {
  const { authorization } = request.headers;
  if (authorization === undefined) {
    reply.unauthorized();
    return;
  }
  request.log.info(`authorization header: ${authorization}`);

  const id = uuidv4();
  const date = new Date();

  const record = {
    id,
    name: request.body.name,
    email: request.body?.email,
    birthdate: request.body?.birthdate,
    rank: 1,
    createdAt: date,
    updatedAt: date,
  };
  try {
    await prisma.user.create({
      data: record,
    });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        request.log.info(`constraint error, email: ${request.body?.email ?? ''}`);
        reply.badRequest(`constraint error, email: ${request.body?.email ?? ''}`);
        return;
      }
    }
    request.log.error(err);
    reply.internalServerError();
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
    request.log.error(err);
    reply.internalServerError();
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
    request.log.error(err);
    reply.internalServerError();
  }
};

export const deleteUserHandler = async (
  request: FastifyRequest<{ Params: GetUserParamsType; Headers: TAuthorizationHeaderObject }>,
  reply: FastifyReply,
): Promise<void> => {
  const { authorization } = request.headers;
  if (authorization === undefined) {
    reply.unauthorized();
    return;
  }
  request.log.info(`authorization header: ${authorization}`);

  try {
    const user = await prisma.user.delete({
      where: {
        id: request.params.id,
      },
    });
    request.log.info(`user deleted, id: ${user.id}`);
    await reply.code(204).send();
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === 'P2025') {
        reply.notFound(`id: ${request.params.id} was not found.`);
      }
    }
    request.log.error(err);
    reply.internalServerError();
  }
};

export const patchUserHandler = async (
  request: FastifyRequest<{
    Params: PatchUserParamsType;
    Body: PatchUserRequestBodyType;
    Headers: TAuthorizationHeaderObject;
  }>,
  reply: FastifyReply,
): Promise<void> => {
  const { authorization } = request.headers;
  if (authorization === undefined) {
    reply.unauthorized();
    return;
  }
  request.log.info(`authorization header: ${authorization}`);

  const data: { name?: string; email?: string; rank?: number; updatedAt: Date } = {
    updatedAt: new Date(),
  };
  const { name, email, rank } = request.body;
  if (name !== '') {
    data.name = name;
  }
  if (email !== undefined) {
    data.email = email;
  }
  if (rank !== undefined) {
    data.rank = rank;
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
    request.log.error(err);
    reply.internalServerError();
  }
};

export const putUserHandler = async (
  request: FastifyRequest<{
    Params: PutUserParamsType;
    Body: PutUserRequestBodyType;
    Headers: TAuthorizationHeaderObject;
  }>,
  reply: FastifyReply,
): Promise<void> => {
  const { authorization } = request.headers;
  if (authorization === undefined) {
    reply.unauthorized();
    return;
  }
  request.log.info(`authorization header: ${authorization}`);

  const { id } = request.params;
  const { name, email, birthdate, rank } = request.body;
  const date = new Date();
  const data = {
    name,
    email,
    birthdate,
    rank,
    updatedAt: date,
  };
  try {
    const user = await prisma.user.upsert({
      where: {
        id: request.params.id,
      },
      update: {
        ...data,
      },
      create: {
        id,
        ...data,
        createdAt: date,
      },
    });
    await reply.code(200).send(user);
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        request.log.info('constraint error');
        reply.badRequest('constraint error');
        return;
      }
    }
    request.log.error(err);
    reply.internalServerError();
  }
};
