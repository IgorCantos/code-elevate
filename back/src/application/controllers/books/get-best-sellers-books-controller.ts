import GetBestSellersBooksUseCase from "@/domain/use-cases/book/get-best-sellers-books-usecase";
import HttpStatus from "@/infraestructure/utils/http-status";
import { FastifyReply, FastifyRequest } from "fastify";

class GetBestSellersBooksController {
  private readonly getBestSellersBooksUseCase: GetBestSellersBooksUseCase;

  constructor(getBestSellersBooksUseCase: GetBestSellersBooksUseCase) {
    this.getBestSellersBooksUseCase = getBestSellersBooksUseCase;
  }

  async execute(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<Promise<FastifyReply>> {
    try {
      const { page, limit } = req.query as { page: string; limit: string };

      const response = await this.getBestSellersBooksUseCase.execute({
        page: Number(page),
        limit: Number(limit),
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

export default GetBestSellersBooksController;
