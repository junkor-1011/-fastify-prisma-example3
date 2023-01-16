import { JsonSchema } from 'fastify-zod';

export type JsonSchemaExtended = JsonSchema & {
  properties?: Record<
    string,
    {
      type: string;
      properties: Record<string, object>;
      example: object;
    }
  >;
};

export const bindExamples = (
  schemas: JsonSchemaExtended[],
  examples: Record<string, object>,
): void => {
  if (schemas.length === 0) return;

  const properties = schemas[0].properties;

  for (const $id in properties) {
    const property = properties[$id];
    const example = examples[`${$id}Example`];

    property.example = example;
  }
};
