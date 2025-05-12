import Redis from "ioredis";
import RedisRepository from "./redis-repository";

jest.mock("ioredis");

describe("RedisRepository", () => {
  let redisRepository: RedisRepository;
  let mockRedis: jest.Mocked<Redis>;

  beforeEach(() => {
    mockRedis = new Redis() as jest.Mocked<Redis>;
    redisRepository = new RedisRepository();
    (redisRepository as any).redis = mockRedis;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getCache", () => {
    it("should return cached data for a given key", async () => {
      const key = "testKey";
      const cachedData = ["item1", "item2"];
      mockRedis.lrange.mockResolvedValue(cachedData);

      const result = await redisRepository.getCache(key);

      expect(mockRedis.lrange).toHaveBeenCalledWith(key, 0, -1);
      expect(result).toEqual(cachedData);
    });
  });

  describe("setCache", () => {
    it("should add data to the cache and trim the list", async () => {
      const key = "testKey";
      const data = { _id: "123", value: "testValue" };
      const currentCacheList = [
        JSON.stringify({ _id: "456", value: "otherValue" }),
      ];
      mockRedis.lrange.mockResolvedValue(currentCacheList);

      await redisRepository.setCache(key, data);

      expect(mockRedis.lrange).toHaveBeenCalledWith(key, 0, -1);
      expect(mockRedis.lrem).not.toHaveBeenCalledWith(
        key,
        0,
        currentCacheList[0]
      );
      expect(mockRedis.lpush).toHaveBeenCalledWith(key, JSON.stringify(data));
      expect(mockRedis.ltrim).toHaveBeenCalledWith(key, 0, 9);
    });

    it("should remove duplicate items from the cache before adding new data", async () => {
      const key = "testKey";
      const data = { _id: "123", value: "testValue" };
      const currentCacheList = [
        JSON.stringify({ _id: "123", value: "oldValue" }),
        JSON.stringify({ _id: "456", value: "otherValue" }),
      ];
      mockRedis.lrange.mockResolvedValue(currentCacheList);

      await redisRepository.setCache(key, data);

      expect(mockRedis.lrem).toHaveBeenCalledWith(key, 0, currentCacheList[0]);
      expect(mockRedis.lpush).toHaveBeenCalledWith(key, JSON.stringify(data));
      expect(mockRedis.ltrim).toHaveBeenCalledWith(key, 0, 9);
    });

    it("should handle JSON parsing errors gracefully", async () => {
      const key = "testKey";
      const data = { _id: "123", value: "testValue" };
      const currentCacheList = ["invalidJSON"];
      mockRedis.lrange.mockResolvedValue(currentCacheList);

      const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();

      await redisRepository.setCache(key, data);

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        "Error on veryfing item duplicity.",
        expect.any(SyntaxError)
      );
      expect(mockRedis.lpush).toHaveBeenCalledWith(key, JSON.stringify(data));
      expect(mockRedis.ltrim).toHaveBeenCalledWith(key, 0, 9);

      consoleWarnSpy.mockRestore();
    });
  });
});
