import { BooksController } from "@/application/controllers";
import HttpStatus from "@/infraestructure/http-status";
import { FastifyInstance } from "fastify";

async function routes(fastify: FastifyInstance) {
  const booksController = new BooksController();

  fastify.get("/", async (_req, res) => {
    return res.status(HttpStatus.SUCCESS).send({ hello: "Ok." });
  });

  /**
   * Books
   */
  fastify.get("/v1/books", booksController.getBooksList);
}

export default routes;
