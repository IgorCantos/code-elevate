import { IGetPaginatedBooksResponse } from "@/domain/repositories";

interface IGetAllBooksService {
  execute({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }): Promise<IGetPaginatedBooksResponse>;
}

export default IGetAllBooksService;
