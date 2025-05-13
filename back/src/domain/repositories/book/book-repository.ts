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
  }: {
    page: number;
    limit: number;
  }): Promise<IGetPaginatedBooksResponse>;
  getBookById({ id }: { id: string }): Promise<Book | null>;
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
}

export default IBookRepository;
export { IGetPaginatedBooksResponse };
