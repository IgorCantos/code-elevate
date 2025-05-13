import { IGetPaginatedBooksResponse } from "@/domain/repositories/book/book-repository";

interface IGetBookByPropertyService {
  execute({
    page,
    limit,
    author,
    genre,
  }: {
    page: number;
    limit: number;
    author?: string;
    genre?: string;
  }): Promise<IGetPaginatedBooksResponse | { message: string }>;
}

export default IGetBookByPropertyService;
