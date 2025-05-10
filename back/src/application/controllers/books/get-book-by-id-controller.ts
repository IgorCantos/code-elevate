import { GetBookByIdUseCase } from "@/domain/use-cases";
import HttpStatus from "@/infraestructure/utils/http-status";
import { FastifyReply, FastifyRequest } from "fastify";

class GetBookByIdController {
  private readonly getBookByIdUseCase: GetBookByIdUseCase;

  constructor(getBookByIdUseCase: GetBookByIdUseCase) {
    this.getBookByIdUseCase = getBookByIdUseCase;
  }

  async execute(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<Promise<FastifyReply>> {
    try {
      const { bookId } = req.params as { bookId: string };

      const response = await this.getBookByIdUseCase.execute({ id: bookId });
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

export default GetBookByIdController;
