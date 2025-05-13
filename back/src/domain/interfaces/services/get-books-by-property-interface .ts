import { IGetPaginatedBooksResponse } from "@/domain/repositories/book/book-repository";

interface IGetBookByPropertyService {
  execute({
    page,
    limit,
    authors,
    genre,
  }: {
    page: number;
    limit: number;
    authors?: string;
    genre?: string;
  }): Promise<IGetPaginatedBooksResponse | { message: string }>;
}

export default IGetBookByPropertyService;
