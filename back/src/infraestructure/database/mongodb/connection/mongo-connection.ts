import { Db, MongoClient } from "mongodb";

class MongoClientSingleton {
  private static instance: MongoClientSingleton;
  private client!: MongoClient;
  private db!: Db;

  private constructor() {}

  public static async getInstance(): Promise<MongoClientSingleton> {
    if (!MongoClientSingleton.instance) {
      MongoClientSingleton.instance = new MongoClientSingleton();

      await MongoClientSingleton.instance.connect();
    }

    return MongoClientSingleton.instance;
  }

  private async connect() {
    const mongoUser = process.env.MONGO_USER || "adm";
    const mongoPass = process.env.MONGO_PASS || "adm";

    this.client = new MongoClient(
      `mongodb://${mongoUser}:${mongoPass}@mongodb:27017/?authSource=admin`
    );

    await this.client.connect();

    this.db = this.client.db("books");
  }

  public getDb(): Db {
    return this.db;
  }

  public async disconnect(): Promise<void> {
    await this.client.close();
  }
}

export default MongoClientSingleton;
