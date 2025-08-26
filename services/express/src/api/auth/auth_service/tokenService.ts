import NodeCache from 'node-cache';

const TokenCache = new NodeCache();

const EXPIRE = 7200; // seconds

class TokenService {
  static async saveTokenData(accessToken: string, userData: Record<string, unknown>): Promise<boolean | undefined> {
    if (accessToken && userData) {
      const setToken = TokenCache.set(accessToken, userData, EXPIRE);
      if (setToken) {
        return setToken;
      }
    }
    return undefined;
  }
}

// Example usage
const success: boolean = TokenCache.set('myKey', { name: 'RES' }, 1);
const exists: boolean = TokenCache.has('myKey');

setTimeout(() => {
  const exr = TokenCache.get<{ name: string }>('myKey');
  console.log(exr);
}, 15000);

export default TokenService;
