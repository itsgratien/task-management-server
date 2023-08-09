import ioRedis from 'ioredis';
import config from 'config';

export const redis = new ioRedis({
  port: config.get('app.redis.port'),
  host: config.get('app.redis.host'),
  password: config.get('app.redis.password'),
  maxRetriesPerRequest: null
});

export class RedisHelper {
  public getRedis() {
    return redis;
  }
}
export default RedisHelper;
