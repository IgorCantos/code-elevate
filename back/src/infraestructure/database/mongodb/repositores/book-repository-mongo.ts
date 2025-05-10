import { Book } from "@/domain/entities";
import { IBookRepository } from "@/domain/repositories";
import MongoClientSingleton from "../connection/mongo-connection";
import { IGetAllBooksResponse } from "@/domain/repositories/book/book-repository";
import { ObjectId, WithId } from "mongodb";

class BookRepositoryMongo implements IBookRepository {
  async getAllBooks(): Promise<IGetAllBooksResponse> {
    const mongoClient = await MongoClientSingleton.getInstance();
    const db = mongoClient.getDb();

    const page = 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    const [dbResponse, totalDocuments] = await Promise.all([
      db.collection<Book>("books").find().skip(skip).limit(limit).toArray(),
      db.collection<Book>("books").countDocuments(),
    ]);

    const totalPages = Math.ceil(totalDocuments / limit);
    const hasNextPage = page < totalPages;
    const booksList = dbResponse.map((book) => new Book(book));

    const response = {
      actualPage: page,
      limitePerPage: limit,
      totalDocuments,
      totalPages,
      hasNextPage,
      hasPreviousPage: page > 1,
      data: booksList,
    };

    return response;
  }

  async getBookById({ id }: { id: string }): Promise<Book | null> {
    const mongoClient = await MongoClientSingleton.getInstance();
    const db = mongoClient.getDb();

    const book = await db
      .collection<WithId<Book>>("books")
      //@ts-ignore
      .findOne({ _id: new ObjectId(id) });

    if (!book) {
      return null;
    }

    return new Book(book);
  }
}

export default BookRepositoryMongo;
