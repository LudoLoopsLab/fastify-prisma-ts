import Fastify from "fastify";
import userRoutes from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";
const server = Fastify();

server.get("/healthcheck", async function (request, response) {
  return { status: "OK" };
});

async function main() {
  for (const schema of userSchemas) {
    server.addSchema(schema);
  }

  server.register(userRoutes, { prefix: "api/users" });

  try {
    await server.listen({ port: 3000, host: "0.0.0.0" });
    console.log("Listening ready http://localhost:3000");
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
main();
