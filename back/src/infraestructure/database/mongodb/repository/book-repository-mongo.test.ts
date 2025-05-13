import MongoClientSingleton from "../connection/mongo-connection";
import BookRepositoryMongo from "./book-repository-mongo";
import { Book } from "@/domain/entities";

jest.mock("../connection/mongo-connection");

describe("BookRepositoryMongo", () => {
  let mockDb: any;
  let bookRepository: BookRepositoryMongo;

  beforeEach(() => {
    mockDb = {
      collection: jest.fn().mockReturnThis(),
      find: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      toArray: jest.fn(),
      countDocuments: jest.fn(),
      findOne: jest.fn(),
    };

    (MongoClientSingleton.getInstance as jest.Mock).mockResolvedValue({
      getDb: jest.fn().mockReturnValue(mockDb),
    });

    bookRepository = new BookRepositoryMongo();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllBooks", () => {
    it("should return paginated books", async () => {
      const mockBooks = [{ title: "Book 1" }, { title: "Book 2" }];
      mockDb.toArray.mockResolvedValue(mockBooks);
      mockDb.countDocuments.mockResolvedValue(40);

      const page = 1;
      const limit = 20;
      const result = await bookRepository.getAllBooks({ page, limit });

      expect(mockDb.collection).toHaveBeenCalledWith("books");
      expect(mockDb.find).toHaveBeenCalled();
      expect(mockDb.skip).toHaveBeenCalledWith(0);
      expect(mockDb.limit).toHaveBeenCalledWith(20);
      expect(mockDb.toArray).toHaveBeenCalled();
      expect(mockDb.countDocuments).toHaveBeenCalled();

      expect(result).toEqual({
        actualPage: 1,
        limitePerPage: 20,
        totalDocuments: 40,
        totalPages: 2,
        hasNextPage: true,
        hasPreviousPage: false,
        data: expect.any(Array),
      });
    });
  });

  describe("getBookById", () => {
    it("should return a book by its ID", async () => {
      const mockBook = { _id: "123", title: "Book 1" };
      mockDb.findOne.mockResolvedValue(mockBook);

      const result = await bookRepository.getBookById({
        id: "681f9fab48212582f5d861e3",
      });

      expect(mockDb.collection).toHaveBeenCalledWith("books");
      expect(mockDb.findOne).toHaveBeenCalledWith({ _id: expect.any(Object) });
      expect(result).toEqual(expect.any(Book));
    });

    it("should return empty list if no book is found", async () => {
      mockDb.findOne.mockResolvedValue(null);

      const result = await bookRepository.getBookById({
        id: "681f9fab48212582f5d861e3",
      });

      expect(mockDb.collection).toHaveBeenCalledWith("books");
      expect(mockDb.findOne).toHaveBeenCalledWith({ _id: expect.any(Object) });
      expect(result).toStrictEqual([]);
    });
  });

  describe("getBookByProperty", () => {
    it("should return books matching the genre filter", async () => {
      const mockBooks = [{ title: "Book 1" }, { title: "Book 2" }];
      mockDb.toArray.mockResolvedValue(mockBooks);
      mockDb.countDocuments.mockResolvedValue(10);

      const page = 1;
      const limit = 20;
      const genre = "Fiction";
      const result = await bookRepository.getBookByProperty({
        page,
        limit,
        genre,
      });

      expect(mockDb.collection).toHaveBeenCalledWith("books");
      expect(mockDb.find).toHaveBeenCalledWith({ genre });
      expect(mockDb.skip).toHaveBeenCalledWith(0);
      expect(mockDb.limit).toHaveBeenCalledWith(20);
      expect(mockDb.toArray).toHaveBeenCalled();
      expect(mockDb.countDocuments).toHaveBeenCalledWith({ genre });

      expect(result).toEqual({
        actualPage: 1,
        limitePerPage: 20,
        totalDocuments: 10,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
        data: expect.any(Array),
      });
    });

    it("should return books matching the author filter", async () => {
      const mockBooks = [{ title: "Book 1" }, { title: "Book 2" }];
      mockDb.toArray.mockResolvedValue(mockBooks);
      mockDb.countDocuments.mockResolvedValue(10);

      const page = 1;
      const limit = 20;
      const author = "Fiction";
      const result = await bookRepository.getBookByProperty({
        page,
        limit,
        author,
      });

      expect(mockDb.collection).toHaveBeenCalledWith("books");
      expect(mockDb.find).toHaveBeenCalledWith({ author });
      expect(mockDb.skip).toHaveBeenCalledWith(0);
      expect(mockDb.limit).toHaveBeenCalledWith(20);
      expect(mockDb.toArray).toHaveBeenCalled();
      expect(mockDb.countDocuments).toHaveBeenCalledWith({ author });

      expect(result).toEqual({
        actualPage: 1,
        limitePerPage: 20,
        totalDocuments: 10,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
        data: expect.any(Array),
      });
    });
  });
});
