import { IGetAllBooksResponse } from "@/domain/repositories/book/book-repository";

interface IGetAllBooksService {
  execute(): Promise<IGetAllBooksResponse>;
}

export default IGetAllBooksService;
