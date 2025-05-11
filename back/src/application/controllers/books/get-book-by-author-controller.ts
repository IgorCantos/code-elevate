import { GetBookByPropertyUseCase } from "@/domain/use-cases";
import HttpStatus from "@/infraestructure/utils/http-status";
import { FastifyReply, FastifyRequest } from "fastify";

class GetBookByAuthorController {
  private readonly getBookByPropertyUseCase: GetBookByPropertyUseCase;

  constructor(getBookByPropertyUseCase: GetBookByPropertyUseCase) {
    this.getBookByPropertyUseCase = getBookByPropertyUseCase;
  }

  async execute(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<Promise<FastifyReply>> {
    try {
      const { author: authors } = req.params as {
        author: string;
      };

      const response = await this.getBookByPropertyUseCase.execute({
        authors,
      });

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

export default GetBookByAuthorController;
