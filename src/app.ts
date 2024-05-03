import fjwt from "@fastify/jwt"
import swagger from "@fastify/swagger"
import Fastify, { FastifyReply, FastifyRequest } from "fastify"
import { withRefResolver } from "fastify-zod"
import { version } from "../package.json"
import productRoutes from "./modules/product/product.route"
import { productSchemas } from "./modules/product/product.schema"
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

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      id: number
      email: string
      name: string
    }
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
  }
)

server.get("/healthCheck", async function (request, response) {
  return { status: "OK" }
})

async function main() {
  for (const schema of [...userSchemas, ...productSchemas]) {
    server.addSchema(schema)
  }

  server.register(
    swagger,
    withRefResolver({
      openapi: {
        info: {
          title: "Fastify API",
          description: "APIT for some products",
          version,
        },
      },
    })
  )

  server.register(require("@fastify/swagger-ui"), {
    routePrefix: "/docs",
    exposeRoute: true,
    staticCSP: true,
  })

  server.register(userRoutes, { prefix: "api/users" })
  server.register(productRoutes, { prefix: "api/products" })

  try {
    await server.listen({ port: 3000, host: "0.0.0.0" })
    console.log("Listening ready http://localhost:3000")
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}
main()
