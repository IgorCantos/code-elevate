import { GetAllBooksUseCase } from "@/domain/use-cases";
import HttpStatus from "@/infraestructure/utils/http-status";
import { FastifyReply, FastifyRequest } from "fastify";

class GetAllBooksController {
  private readonly getAllBooksUseCase: GetAllBooksUseCase;

  constructor(getAllBooksUseCase: GetAllBooksUseCase) {
    this.getAllBooksUseCase = getAllBooksUseCase;
  }

  async execute(
    _req: FastifyRequest,
    res: FastifyReply
  ): Promise<Promise<FastifyReply>> {
    try {
      const response = await this.getAllBooksUseCase.execute();
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

export default GetAllBooksController;
