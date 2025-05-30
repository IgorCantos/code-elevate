import { GetAllBooksUseCase } from "@/domain/use-cases";
import HttpStatus from "@/infraestructure/utils/http-status";
import { FastifyReply, FastifyRequest } from "fastify";

class GetAllBooksController {
  private readonly getAllBooksUseCase: GetAllBooksUseCase;

  constructor(getAllBooksUseCase: GetAllBooksUseCase) {
    this.getAllBooksUseCase = getAllBooksUseCase;
  }

  async execute(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<Promise<FastifyReply>> {
    try {
      const { page, limit, title } = req.query as {
        page: string;
        limit: string;
        title: string;
      };

      const response = await this.getAllBooksUseCase.execute({
        page: Number(page),
        limit: Number(limit),
        title,
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

export default GetAllBooksController;
