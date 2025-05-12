import Redis from "ioredis";
import { ICacheRepository } from "@/domain/repositories";

class RedisRepository implements ICacheRepository {
  private redis: Redis;

  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST || "localhost",
      port: 6379,
    });
  }

  async getCache(key: string): Promise<any> {
    return await this.redis.lrange(key, 0, -1);
  }

  async setCache(key: string, data: any): Promise<void> {
    const maxItemsToCache = 9;

    const currentCacheList = await this.redis.lrange(key, 0, -1);

    for (const item of currentCacheList) {
      try {
        const parsed = JSON.parse(item);
        if (parsed._id === data._id) {
          await this.redis.lrem(key, 0, item);
          break;
        }
      } catch (err) {
        console.warn("Error on veryfing item duplicity.", err);
      }
    }

    const dataString = JSON.stringify(data);
    await this.redis.lpush(key, dataString);
    await this.redis.ltrim(key, 0, maxItemsToCache);
  }
}

export default RedisRepository;
