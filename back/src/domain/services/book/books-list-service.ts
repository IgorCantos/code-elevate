import { Book } from "@/domain/entities";

interface IBooksListService {
  getBooksList(): Promise<Book[]>;
}

export default IBooksListService;
