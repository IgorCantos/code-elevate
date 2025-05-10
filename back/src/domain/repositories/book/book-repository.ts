import { Book } from "@/domain/entities";

interface IBookRepository {
  getBooksList(): Promise<Book[]>;
}

export default IBookRepository;
