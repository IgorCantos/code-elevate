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
      const page = req.headers["page"] as string;
      const limit = req.headers["limit"] as string;

      const response = await this.getAllBooksUseCase.execute({
        page: Number(page),
        limit: Number(limit),
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

export default GetAllBooksController;
