const databaseName = "smart-education-materials";
const storeName = "files";
const databaseVersion = 1;

const openDatabase = () =>
  new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) {
      reject(new Error("Your browser does not support saving uploaded materials."));
      return;
    }

    const request = window.indexedDB.open(databaseName, databaseVersion);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(storeName)) {
        database.createObjectStore(storeName);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("Unable to open material storage."));
  });

export const savePublishedMaterialFile = async (id, file) => {
  const database = await openDatabase();
  try {
    await new Promise((resolve, reject) => {
      const transaction = database.transaction(storeName, "readwrite");
      transaction.objectStore(storeName).put(file, String(id));
      transaction.oncomplete = resolve;
      transaction.onerror = () => reject(transaction.error || new Error("Unable to save the uploaded file."));
      transaction.onabort = () => reject(transaction.error || new Error("Saving the uploaded file was cancelled."));
    });
  } finally {
    database.close();
  }
};

export const getPublishedMaterialFile = async (id) => {
  const database = await openDatabase();
  try {
    return await new Promise((resolve, reject) => {
      const transaction = database.transaction(storeName, "readonly");
      const request = transaction.objectStore(storeName).get(String(id));
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error || new Error("Unable to read the uploaded file."));
    });
  } finally {
    database.close();
  }
};

export const deletePublishedMaterialFile = async (id) => {
  const database = await openDatabase();
  try {
    await new Promise((resolve, reject) => {
      const transaction = database.transaction(storeName, "readwrite");
      transaction.objectStore(storeName).delete(String(id));
      transaction.oncomplete = resolve;
      transaction.onerror = () => reject(transaction.error || new Error("Unable to delete the uploaded file."));
      transaction.onabort = () => reject(transaction.error || new Error("Deleting the uploaded file was cancelled."));
    });
  } finally {
    database.close();
  }
};
