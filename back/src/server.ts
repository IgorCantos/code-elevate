import Fastify from "fastify";
import { routes } from "./infraestructure/webserver/routes";

const fastify = Fastify({
  connectionTimeout: 10000,
  logger: true,
});

const startServer = async () => {
  try {
    await fastify.register(routes);
    await fastify.listen({ port: 8080, host: "0.0.0.0" });

    console.log("Server escutando na porta 8080.");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

startServer();
