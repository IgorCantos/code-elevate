import BooksControllerFactory from "@/facotries/controllers/books/make-get-books-list-controller";
import HttpStatus from "@/infraestructure/utils/http-status";
import { FastifyInstance } from "fastify";

async function routes(fastify: FastifyInstance) {
  const booksListController = new BooksControllerFactory().create();

  fastify.get("/health", async (_req, res) => {
    return res.status(HttpStatus.SUCCESS).send({ hello: "Ok." });
  });

  /**
   * Books
   */
  fastify.get("/v1/books", (req, res) =>
    booksListController.getBooksList(req, res)
  );
}

export default routes;
