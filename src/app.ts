import Fastify, { FastifyRequest, FastifyReply } from "fastify"
import fjwt from "@fastify/jwt"
import userRoutes from "./modules/user/user.route"
import { userSchemas } from "./modules/user/user.schema"

export const server = Fastify()

server.register(fjwt, {
  // cspell:disable-next-line
  secret: "YZCVg57Da8RNo7uLhVggiDcbRGoWBv",
})

declare module "fastify" {
  export interface FastifyInstance {
    authenticate: any
  }
}

server.decorate(
  "authenticate",
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify()
    } catch (e) {
      await reply.send(e)
    }
  },
)

server.get("/healthCheck", async function (request, response) {
  return { status: "OK" }
})

async function main() {
  for (const schema of userSchemas) {
    server.addSchema(schema)
  }

  server.register(userRoutes, { prefix: "api/users" })

  try {
    await server.listen({ port: 3000, host: "0.0.0.0" })
    console.log("Listening ready http://localhost:3000")
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}
main()
