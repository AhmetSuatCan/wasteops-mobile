import * as SecureStore from 'expo-secure-store';

// Save tokens
export const saveToken = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value);
};

// Get tokens
export const getToken = async (key: string) => {
  return await SecureStore.getItemAsync(key);
};

// Delete tokens
export const deleteToken = async (key: string) => {
  await SecureStore.deleteItemAsync(key);
};
