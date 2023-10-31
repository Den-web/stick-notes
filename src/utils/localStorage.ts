export const updateLocalStorage = <T>(key: string, data: T) => {
  try {
    const dataJSON = JSON.stringify(data);
    localStorage.setItem(key, dataJSON);
  } catch (error) {
    console.error('Error updating local storage:', error);
  }
};