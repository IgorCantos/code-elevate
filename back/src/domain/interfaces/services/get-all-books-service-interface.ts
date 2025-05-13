import { IGetPaginatedBooksResponse } from "@/domain/repositories/book/book-repository";

interface IGetAllBooksService {
  execute({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }): Promise<IGetPaginatedBooksResponse | null>;
}

export default IGetAllBooksService;
