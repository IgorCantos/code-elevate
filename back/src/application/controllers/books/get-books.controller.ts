import { BooksListUseCase } from "@/application/use-cases";
import { IBook } from "@/domain";
import HttpStatus from "@/infraestructure/http-status";
import { FastifyReply, FastifyRequest } from "fastify";

class BooksController {
  constructor() {}

  async getBooksList(
    _req: FastifyRequest,
    res: FastifyReply
  ): Promise<
    IBook[] | [] | { message: string } | { message: string; error: string }
  > {
    try {
      const response = await new BooksListUseCase().execute();
      return res.status(HttpStatus.SUCCESS).send(response);
    } catch (error: any) {
      console.error("Error fetching books list:", error);

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message:
          "Something unexpected happened while retrieving the books list.",
        error: error.message,
      });
    }
  }
}

export default BooksController;
