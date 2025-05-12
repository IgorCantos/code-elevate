import { MongoClient, Db } from "mongodb";
import MongoClientSingleton from "./mongo-connection";

jest.mock("mongodb", () => {
  const mockDb = {};
  const mockClient = {
    connect: jest.fn().mockResolvedValue(undefined),
    db: jest.fn().mockReturnValue(mockDb),
    close: jest.fn().mockResolvedValue(undefined),
  };
  return {
    MongoClient: jest.fn(() => mockClient),
    Db: jest.fn(),
  };
});

describe("MongoClientSingleton", () => {
  let mongoClientSingleton: MongoClientSingleton;

  beforeEach(async () => {
    jest.clearAllMocks();
    mongoClientSingleton = await MongoClientSingleton.getInstance();
  });

  it("should create a single instance of MongoClientSingleton", async () => {
    const instance1 = await MongoClientSingleton.getInstance();
    const instance2 = await MongoClientSingleton.getInstance();

    expect(instance1).toBe(instance2);
  });

  it("should close the connection when disconnect is called", async () => {
    await mongoClientSingleton.disconnect();
    expect((mongoClientSingleton as any).client.close).toHaveBeenCalled();
  });
});
