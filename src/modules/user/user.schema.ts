import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

import { bindExamples } from '@/libs/openapiSpec.js';
import { pickObject, omitObject } from '@/libs/utils/object.js';

export const userBase = {
  id: z.string().uuid().describe('user id'),
  name: z.string().describe('user name'),
  email: z.string().email().optional().describe("user's email address"),
  rank: z.number().min(1).max(10).step(1).default(1).describe('the rank of user'),
  birthdate: z.date().describe('bitrth day of the user'),
  createdAt: z.date().describe('signup date'),
  updatedAt: z.date().describe('last modified date'),
};

export const userInputSchema = z.object(
  omitObject(userBase, ['id', 'rank', 'createdAt', 'updatedAt']),
);
export type UserInputType = z.infer<typeof userInputSchema>;
const userInputSchemaExample: UserInputType = {
  name: 'test-user',
  email: 'test-user@example.com',
  birthdate: new Date('2022-12-01T12:00:00.000Z'),
};

export const userSchema = z.object({ ...userBase });
export type UserType = z.infer<typeof userSchema>;
const userSchemaExample: UserType = {
  id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  name: 'test-user',
  email: 'test-user@example.com',
  rank: 10,
  birthdate: new Date('2022-12-01T12:00:00.000Z'),
  createdAt: new Date('2022-12-01T12:00:00.000Z'),
  updatedAt: new Date('2022-12-01T12:00:00.000Z'),
};

export const userListSchema = z.array(z.object({ ...userBase }));
export type userListType = z.infer<typeof userListSchema>;

export const getUsersQuerySchema = z.object({
  limit: z.number().min(1).step(1).default(100).describe('limit').optional(),
  offset: z.number().min(0).step(1).describe('offset').optional(),
});
export type GetUsersQueryType = z.infer<typeof getUsersQuerySchema>;

export const getUserParamsSchema = z.object({
  id: userBase.id,
});
export type GetUserParamsType = z.infer<typeof getUserParamsSchema>;

export const deleteUserParamsSchema = z.object({
  id: userBase.id,
});
export type DeleteUserParamsType = z.infer<typeof deleteUserParamsSchema>;

export const patchUserParamsSchema = z.object({
  id: userBase.id,
});
export type PatchUserParamsType = z.infer<typeof patchUserParamsSchema>;

export const patchUserRequestBodySchema = (() => {
  const picked = pickObject(userBase, ['name', 'email', 'rank']);
  return z.object(picked).partial();
})();
export type PatchUserRequestBodyType = z.infer<typeof patchUserRequestBodySchema>;

export const putUserParamsSchema = z.object({
  id: z.string().uuid().describe('id of the user'),
});
export type PutUserParamsType = z.infer<typeof putUserParamsSchema>;

export const putUserRequestBodySchema = (() => {
  const picked = pickObject(userBase, ['name', 'email', 'birthdate', 'rank']);
  return z.object(picked);
})();
export type PutUserRequestBodyType = z.infer<typeof putUserRequestBodySchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas(
  {
    userInputSchema,
    userSchema,
    userListSchema,
    getUsersQuerySchema,
    getUserParamsSchema,
    putUserParamsSchema,
    putUserRequestBodySchema,
    patchUserParamsSchema,
    patchUserRequestBodySchema,
    deleteUserParamsSchema,
  },
  {
    $id: 'userSchemas',
  },
);

const schemaExamples = {
  userInputSchemaExample,
  userSchemaExample,
};

bindExamples(userSchemas, schemaExamples);
