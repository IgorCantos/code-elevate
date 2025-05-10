import GetAllBooksControllerFactory from "@/facotries/controllers/books/get-all-books/get-all-books-controller-factory";
import HttpStatus from "@/infraestructure/utils/http-status";
import { FastifyInstance } from "fastify";

async function routes(fastify: FastifyInstance) {
  const getAllBooksController = new GetAllBooksControllerFactory().create();

  fastify.get("/health", async (_req, res) => {
    return res.status(HttpStatus.SUCCESS).send({ hello: "Ok." });
  });

  /**
   * Books
   */
  fastify.get("/v1/books", (req, res) =>
    getAllBooksController.execute(req, res)
  );

  // fastify.get("/v1/books/:id", (req, res) =>
  //   bookByIdController.getBookById(req, res)
  // );
}

export default routes;
