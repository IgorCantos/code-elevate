import { Book } from "@/domain/entities";

interface IBooksListResponse {
  actualPage: number;
  limitePerPage: number;
  totalDocuments: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  data: Book[];
}

interface IBookRepository {
  getBooksList(): Promise<IBooksListResponse>;
}

export default IBookRepository;
export { IBooksListResponse };
