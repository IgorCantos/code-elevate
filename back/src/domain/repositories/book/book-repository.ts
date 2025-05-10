import { Book } from "@/domain/entities";

interface IGetAllBooksResponse {
  actualPage: number;
  limitePerPage: number;
  totalDocuments: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  data: Book[];
}

interface IBookRepository {
  getAllBooks(): Promise<IGetAllBooksResponse>;
  getBookById(): Promise<Book | null>;
}

export default IBookRepository;
export { IGetAllBooksResponse };
