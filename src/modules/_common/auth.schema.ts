import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

import { bindExamples } from '@/libs/openapiSpec';

export const schemaOfReqestHeaderForAuth = z.object({
  Authorization: z.string().min(1).describe('token'),
});
export type TRequestHeaderForAuth = z.infer<typeof schemaOfReqestHeaderForAuth>;
const schemaOfReqestHeaderForAuthExample = {
  Authorization: 'hogefugafoo',
};

export const { schemas: headerForAuthSchemas, $ref } = buildJsonSchemas(
  {
    schemaOfReqestHeaderForAuth,
  },
  {
    $id: 'headers',
  },
);

const schemaExamples = {
  schemaOfReqestHeaderForAuthExample,
};

bindExamples(headerForAuthSchemas, schemaExamples);
