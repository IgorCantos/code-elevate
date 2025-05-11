import { UpdateRecentlyViewedBooksUseCase } from "@/domain/use-cases";
import HttpStatus from "@/infraestructure/utils/http-status";
import { FastifyReply, FastifyRequest } from "fastify";

class UpdateRecentlyViewedBooksController {
  private readonly updateRecentlyViewedBooksUseCase: UpdateRecentlyViewedBooksUseCase;

  constructor(
    updateRecentlyViewedBooksUseCase: UpdateRecentlyViewedBooksUseCase
  ) {
    this.updateRecentlyViewedBooksUseCase = updateRecentlyViewedBooksUseCase;
  }

  async execute(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<Promise<FastifyReply>> {
    try {
      const { userId } = req.params as {
        userId: string;
      };
      const data = req.body as { data: any };

      await this.updateRecentlyViewedBooksUseCase.execute({ userId, data });
      return res.status(HttpStatus.NO_CONENT).send({
        message: "User recently viewed books updated successfully.",
      });
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

export default UpdateRecentlyViewedBooksController;
