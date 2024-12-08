import Fastify from "fastify";

const fastify = Fastify({
  connectionTimeout: 10000,
  logger: true,
});

fastify.get("/", async (request, reply) => {
  return { hello: "Oi!" };
});

const startServer = async () => {
  try {
    await fastify.listen({ port: 8080, host: "0.0.0.0" });
    console.log("Server escutando na porta 8080.");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

startServer();
