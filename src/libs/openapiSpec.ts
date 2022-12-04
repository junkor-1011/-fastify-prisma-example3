import { JsonSchema } from 'fastify-zod';

export type JsonSchemaExtended = JsonSchema & {
  properties?: {
    [key: string]: {
      type: string;
      properties: {
        [key: string]: object;
      };
      example: object;
    };
  };
};

export const bindExamples = (
  schemas: JsonSchemaExtended[],
  examples: { [id: string]: object },
): void => {
  if (schemas.length === 0) return;

  const properties = schemas[0].properties;

  for (const $id in properties) {
    const property = properties[$id];
    const example = examples[`${$id}Example`];

    property.example = example;
  }
};
