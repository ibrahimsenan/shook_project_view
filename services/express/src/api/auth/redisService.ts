// const Redis = require('../../../src/redis/redis');
import Redis from '../../redis/redis';

class RedisService {
  static async isTokenExists(token: string): Promise<any> {
    const redisRes = await Redis.get(token);
    if (redisRes) {
      const redisDataJson = JSON.parse(redisRes);
      return redisDataJson;
    } else {
      return undefined;
    }
  }

  public static async getTokenData(token: string): Promise<any> {
    const redisRes = await Redis.get(token);
    if (redisRes) {
      const redisDataJson = JSON.parse(redisRes);
      return redisDataJson;
    } else {
      return undefined;
    }
  }

  public static async saveTokenData(
    accessToken: string,
    tokenData: Object,
  ): Promise<any> {
    const tokenDataString = JSON.stringify(tokenData);
    const reds = await Redis.set(accessToken, tokenDataString);
    await Redis.expire(accessToken, 7500);
    if (reds) {
      return reds;
    } else {
      return undefined;
    }
  }

  public static async removeToken(token: string): Promise<any> {
    const isToken = await Redis.get(token);
    if (isToken) {
      await Redis.del(token);
      return true;
    } else {
      return undefined;
    }
  }

  public static async keepAliveToken(token: string): Promise<any> {
    const extendToken = await Redis.expire(token, 7500);
    if (extendToken) {
      return extendToken;
    } else {
      return undefined;
    }
  }
}

export default RedisService;
