import { GetBookByPropertyUseCase } from "@/domain/use-cases";
import HttpStatus from "@/infraestructure/utils/http-status";
import { FastifyReply, FastifyRequest } from "fastify";

class GetBookByGenreController {
  private readonly getBookByPropertyUseCase: GetBookByPropertyUseCase;

  constructor(getBookByPropertyUseCase: GetBookByPropertyUseCase) {
    this.getBookByPropertyUseCase = getBookByPropertyUseCase;
  }

  async execute(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<Promise<FastifyReply>> {
    try {
      const { genre } = req.params as {
        genre: string;
      };

      const { page, limit } = req.query as {
        page: string;
        limit: string;
      };

      const response = await this.getBookByPropertyUseCase.execute({
        page: Number(page),
        limit: Number(limit),
        genre,
      });

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

export default GetBookByGenreController;
