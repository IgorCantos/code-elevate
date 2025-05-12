import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { booksRoutes, usersRoutes } from "./infraestructure/webserver/routes";

const fastify = Fastify({
  connectionTimeout: 10000,
  logger: true,
});

const startServer = async () => {
  try {
    console.log("IGOR", fastify);

    await fastify.register(cors, {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
    });
    await fastify.register(booksRoutes);
    await fastify.register(usersRoutes);
    await fastify.listen({ port: 8080, host: "0.0.0.0" });

    console.log("Server escutando na porta 8080.");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

startServer();

export { startServer };
