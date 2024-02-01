export const getSessionStorageItem = <T>(key: string): T | undefined => {
  const item = sessionStorage.getItem(key);
  return item ? JSON.parse(item) : undefined;
};
