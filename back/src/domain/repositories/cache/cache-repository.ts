interface ICacheRepository {
  getCache(key: string): Promise<any>;
  setCache(key: string, data: any): Promise<void>;
}

export default ICacheRepository;
