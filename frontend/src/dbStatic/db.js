import { openDB } from "idb";

const dbPromise = openDB("app-db", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("users")) {
      const userStore = db.createObjectStore("users", { keyPath: "id", autoIncrement: true });
      userStore.createIndex("name", "name", { unique: true });
      userStore.createIndex("email", "email", { unique: true });
      userStore.createIndex("password", "password", { unique: false });
    }

    if (!db.objectStoreNames.contains("species")) {
      const speciesStore = db.createObjectStore("species", { keyPath: "id", autoIncrement: true });
      speciesStore.createIndex("nome", "nome", { unique: true });
      speciesStore.createIndex("nomePopular", "nomePopular", { unique: false });
      speciesStore.createIndex("bioma", "bioma", { unique: false });
      speciesStore.createIndex("habitat", "habitat", { unique: false });
      speciesStore.createIndex("altura", "altura", { unique: false });
      speciesStore.createIndex("diametro", "diametro", { unique: false });
      speciesStore.createIndex("longevidade", "longevidade", { unique: false });
      speciesStore.createIndex("Urlimage", "Urlimage", { unique: true });
    }
  },
});

export default dbPromise;