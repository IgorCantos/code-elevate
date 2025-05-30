import {
  GetAllBooksControllerFactory,
  GetBookByGenreControllerFactory,
  GetBookByIdControllerFactory,
  GetBookByAuthorControllerFactory,
  GetBestSellersBooksControllerFactory,
} from "@/facotries";
import HttpStatus from "@/infraestructure/utils/http-status";
import { FastifyInstance } from "fastify";

async function booksRoutes(fastify: FastifyInstance) {
  const getAllBooksController = new GetAllBooksControllerFactory().create();
  const getBestSellersBooksController =
    new GetBestSellersBooksControllerFactory().create();
  const getBookByIdController = new GetBookByIdControllerFactory().create();
  const getBookByGenreControllerFactory =
    new GetBookByGenreControllerFactory().create();
  const getBookByAuthorControllerFactory =
    new GetBookByAuthorControllerFactory().create();

  fastify.get("/health", async (_req, res) => {
    return res.status(HttpStatus.SUCCESS).send({ hello: "Ok." });
  });

  /**
   * Books
   */
  fastify.get("/v1/books", (req, res) =>
    getAllBooksController.execute(req, res)
  );

  fastify.get("/v1/books/best-sellers", (req, res) =>
    getBestSellersBooksController.execute(req, res)
  );

  fastify.get("/v1/books/:bookId", (req, res) =>
    getBookByIdController.execute(req, res)
  );

  fastify.get("/v1/books/genre/:genre", (req, res) =>
    getBookByGenreControllerFactory.execute(req, res)
  );

  fastify.get("/v1/books/author/:author", (req, res) =>
    getBookByAuthorControllerFactory.execute(req, res)
  );
}

export default booksRoutes;
