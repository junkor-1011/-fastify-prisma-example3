import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

export const userBase = z.object({
  id: z.string().uuid().describe('user id'),
  name: z.string().describe('user name'),
  email: z.string().email().optional().describe("user's email address"),
  age: z.number().min(0).max(120).step(1).optional().describe('the age of user'),
  createdAt: z.date().describe('signup date'),
  updatedAt: z.date().describe('last modified date'),
});

export const userInputSchema = userBase.pick({ name: true, email: true, age: true });
export type UserInputType = z.infer<typeof userInputSchema>;

export const userSchema = userBase;
export type UserType = z.infer<typeof userSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas(
  {
    userInputSchema,
    userSchema,
  },
  {
    $id: 'userSchemas',
  },
);
