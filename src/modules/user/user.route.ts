import { FastifyInstance } from "fastify";
import { registerUserHandler } from "./user.controllers";
import { $ref } from "./user.schema";

async function userRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      schema: {
        body: $ref("createUserSchema"),
        response: { 201: $ref("createUserResponseSchema") },
      },
    },
    registerUserHandler,
  );
}

export default userRoutes;
