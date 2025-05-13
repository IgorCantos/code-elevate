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
      const { author } = req.params as {
        author: string;
      };
      const page = req.headers["page"] as string;
      const limit = req.headers["limit"] as string;

      const response = await this.getBookByPropertyUseCase.execute({
        page: Number(page),
        limit: Number(limit),
        author,
      });

      return res.status(HttpStatus.SUCCESS).send(response);
    } catch (error: any) {
      console.error("Error fetching books list:", error);

      return res
        .status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
        .send({
          error: error.message,
        });
    }
  }
}

export default GetBookByAuthorController;
