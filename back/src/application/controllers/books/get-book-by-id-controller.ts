import { GetBookByIdUseCase } from "@/application/use-cases";
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

      return res
        .status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
        .send({
          error: error.message || "Internal server error",
        });
    }
  }
}

export default GetBookByIdController;
