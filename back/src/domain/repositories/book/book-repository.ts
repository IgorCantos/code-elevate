import { Book } from "@/domain/entities";

interface IGetPaginatedBooksResponse {
  actualPage: number;
  limitePerPage: number;
  totalDocuments: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  data: Book[];
}

interface IBookRepository {
  getAllBooks({
    page,
    limit,
    title,
  }: {
    page: number;
    limit: number;
    title: string;
  }): Promise<IGetPaginatedBooksResponse>;
  getBookById({ id }: { id: string }): Promise<Book | []>;
  getBookByProperty({
    page,
    limit,
    authors,
    genre,
  }: {
    page: number;
    limit: number;
    authors?: string;
    genre?: string;
  }): Promise<IGetPaginatedBooksResponse>;
  getBestSellersBooks({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }): Promise<IGetPaginatedBooksResponse>;
}

export default IBookRepository;
export { IGetPaginatedBooksResponse };
