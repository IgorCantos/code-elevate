import {
  GetAllBooksControllerFactory,
  GetBookByGenreControllerFactory,
  GetBookByIdControllerFactory,
} from "@/facotries";
import HttpStatus from "@/infraestructure/utils/http-status";
import { FastifyInstance } from "fastify";

async function routes(fastify: FastifyInstance) {
  const getAllBooksController = new GetAllBooksControllerFactory().create();
  const getBookByIdController = new GetBookByIdControllerFactory().create();
  const getBookByGenreControllerFactory =
    new GetBookByGenreControllerFactory().create();

  fastify.get("/health", async (_req, res) => {
    return res.status(HttpStatus.SUCCESS).send({ hello: "Ok." });
  });

  /**
   * Books
   */
  fastify.get("/v1/books", (req, res) =>
    getAllBooksController.execute(req, res)
  );

  fastify.get("/v1/books/:bookId", (req, res) =>
    getBookByIdController.execute(req, res)
  );

  fastify.get("/v1/books/genre/:genre", (req, res) =>
    getBookByGenreControllerFactory.execute(req, res)
  );
}

export default routes;
