import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

import { bindExamples } from '@/libs/openapiSpec';
import { omitObject } from '@/libs/utils/object';

export const errorResponseBase = {
  statusCode: z.number().min(400).max(599).describe('http error status code'),
  error: z.string().min(1).describe('summary of the error'),
  message: z.string().describe('error message for clients'),
};

export const schemaOfErrorResponse = z.object(errorResponseBase);
export type TErrorResponse = z.infer<typeof schemaOfErrorResponse>;
const schemaOfErrorResponseExample = {
  statusCode: 500,
  error: 'Internal Server Error',
  message: 'something went wrong',
};

export const schemaOf4xxErrorResponse = z.object({
  statusCode: z.number().min(400).max(499).describe('http error status code(client error)'),
  ...omitObject(errorResponseBase, ['statusCode']),
});
export type T4xxErrorResponse = z.infer<typeof schemaOf4xxErrorResponse>;
const schemaOf4xxErrorResponseExample = {
  statusCode: 404,
  error: 'Not Found',
  message: 'resource not found',
};

export const schemaOf5xxErrorResponse = z.object({
  statusCode: z.number().min(500).max(599).describe('http error status code(server error)'),
  ...omitObject(errorResponseBase, ['statusCode']),
});
export type T5xxErrorResponse = z.infer<typeof schemaOf4xxErrorResponse>;
const schemaOf5xxErrorResponseExample = {
  statusCode: 502,
  error: 'Bad Gateway',
  message: 'Bad Gateway',
};

export const { schemas: errorResponseSchemas, $ref } = buildJsonSchemas(
  {
    schemaOfErrorResponse,
    schemaOf4xxErrorResponse,
    schemaOf5xxErrorResponse,
  },
  {
    $id: 'ErrorResponse',
  },
);

const schemaExamples = {
  schemaOfErrorResponseExample,
  schemaOf4xxErrorResponseExample,
  schemaOf5xxErrorResponseExample,
};

bindExamples(errorResponseSchemas, schemaExamples);
