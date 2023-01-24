import { z } from 'zod';

export const schemaOfAuthorizationHeaderObject = z.object({
  authorization: z.string().min(1).optional().describe('apiKey'),
});
export type TAuthorizationHeaderObject = z.infer<typeof schemaOfAuthorizationHeaderObject>;
