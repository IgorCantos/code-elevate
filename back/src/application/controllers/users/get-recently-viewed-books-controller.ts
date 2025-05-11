import { GetRecentlyViewedBooksUseCase } from "@/domain/use-cases";
import HttpStatus from "@/infraestructure/utils/http-status";
import { FastifyReply, FastifyRequest } from "fastify";

class GetRecentlyViewedBooksController {
  private readonly getRecentlyViewedBooksUseCase: GetRecentlyViewedBooksUseCase;

  constructor(getRecentlyViewedBooksUseCase: GetRecentlyViewedBooksUseCase) {
    this.getRecentlyViewedBooksUseCase = getRecentlyViewedBooksUseCase;
  }

  async execute(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<Promise<FastifyReply>> {
    try {
      const { userId } = req.params as {
        userId: string;
      };

      const response = await this.getRecentlyViewedBooksUseCase.execute({
        userId,
      });
      return res.status(HttpStatus.SUCCESS).send(response);
    } catch (error: any) {
      console.error("Error updating the user recently viewed books:", error);

      // TODO add exception handler

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message:
          "Something unexpected happened while update the user recently viewed books.",
        error: error.message,
      });
    }
  }
}

export default GetRecentlyViewedBooksController;
