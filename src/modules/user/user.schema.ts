import z from "zod";
import { buildJsonSchemas } from "fastify-zod";

const userCore = z
  .object({
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      })
      .email(),
    name: z.string(),
  })
  .strict();

const createUserSchema = userCore.extend({
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  }),
});

const createUserResponseSchema = userCore
  .extend({
    id: z.number(),
  })
  .strict();

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema,
});
