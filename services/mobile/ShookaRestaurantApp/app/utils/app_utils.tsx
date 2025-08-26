
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserData {
  // we need to know what data keys need to be stored as user data.
}

export async function storeUserData(key: string, data: any): Promise<any> {
  await AsyncStorage.setItem(key, JSON.stringify({ value: data }));
}

export async function getStoredValue(key: string): Promise<any | null> {
  const value = await AsyncStorage.getItem(key);
  if (!value) {
    return null
  }
  return JSON.parse(value);
}

export let ACCESS_TOKEN: string;

export function setStoreToken(token: string) {
  ACCESS_TOKEN = token;
}
