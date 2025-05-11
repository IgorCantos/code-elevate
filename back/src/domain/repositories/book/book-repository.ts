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
  getAllBooks(): Promise<IGetPaginatedBooksResponse>;
  getBookById({ id }: { id: string }): Promise<Book | null>;
  getBookByProperty(filter: Book): Promise<IGetPaginatedBooksResponse>;
}

export default IBookRepository;
export { IGetPaginatedBooksResponse as IGetAllBooksResponse };
