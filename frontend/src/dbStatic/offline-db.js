import dbPromise from "./db";
import bcrypt from "bcryptjs";

export async function addAllUsers(users) {
  const db = await dbPromise;
  const tx = db.transaction("users", "readwrite");

  for (const user of users) {
    await tx.store.put(user);
  }
  await tx.done;
}

export async function getUserByEmailOffline(email) {
  const db = await dbPromise;
  const tx = db.transaction("users", "readonly");
  const store = tx.store.index("email");
  return store.get(email);
}

export async function loginOffline(email, password) {
  const user = await getUserByEmailOffline(email);
  if (!user) {
    return {
      success: false,
      message: "Usuário não encontrado no modo offline.",
    };
  }
  const match = bcrypt.compareSync(password, user.password);
  if (!match) {
    return { success: false, message: "Senha incorreta no modo offline." };
  }
  return { success: true, message: "Login offline bem-sucedido!", user };
}

export async function getAllSpecies(species) {
  const db = await dbPromise;
  const tx = db.transaction("species", "readwrite");
  for (const specie of species) {
    await tx.store.put(specie);
  }
  await tx.done;
}

export async function getSpeciesById(id) {
  const db = await dbPromise;
  const tx = db.transaction("species", "readonly");
  const store = tx.objectStore("species");

  const numericId = Number(id);
  if (isNaN(numericId)) {
    throw new Error(`ID inválido: ${id}`);
  }

  const data = await store.get(numericId);

  if (!data) {
    console.warn(`Espécie com ID ${numericId} não encontrada no IndexedDB.`);
    return null;
  }

  return data;
}

export async function fetchSpeciesFromCache() {
  const db = await dbPromise;
  const tx = db.transaction("species", "readonly");
  const allSpecies = await tx.store.getAll();
  return allSpecies;
}
