import { Book } from "@/domain/entities";
import { IBookRepository } from "@/domain/repositories";
import MongoClientSingleton from "../connection/mongo-connection";

class BookRepositoryMongo implements IBookRepository {
  async getBooksList(): Promise<Book[]> {
    const mongoClient = await MongoClientSingleton.getInstance();
    const db = mongoClient.getDb();

    // TODO fix pagination
    const page = 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const response = await db
      .collection<Book>("books")
      .find()
      .skip(skip)
      .limit(limit)
      .toArray();

    const booksList = response.map((book) => new Book(book));

    return booksList;
  }
}

export default BookRepositoryMongo;
