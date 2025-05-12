import { GetBookByPropertyService } from "@/application/services";
import { IGetAllBooksResponse } from "@/domain/repositories/book/book-repository";

class GetBookByPropertyUseCase {
  getBookByPropertyService: GetBookByPropertyService;

  constructor(getBookByPropertyService: GetBookByPropertyService) {
    this.getBookByPropertyService = getBookByPropertyService;
  }

  async execute({
    page,
    limit,
    authors,
    genre,
  }: {
    page: number;
    limit: number;
    authors?: string;
    genre?: string;
  }): Promise<IGetAllBooksResponse | { message: string }> {
    const response = await this.getBookByPropertyService.execute({
      page,
      limit,
      authors,
      genre,
    });

    if (!response) {
      return {
        message: "No book found.",
      };
    }

    return response;
  }
}

export default GetBookByPropertyUseCase;
