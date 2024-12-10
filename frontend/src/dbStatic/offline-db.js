import dbPromise from "./db";

export async function addAllUsers(users) {
  const db = await dbPromise;
  const tx = db.transaction("users", "readwrite");

  for (const user of users) {
    await tx.store.put(user);
  }
  
  await tx.done;
}

export async function getUserBynameOffline(name) {
  const db = await dbPromise;
  const tx = db.transaction("users", "readonly");
  const store = tx.store.index("name");
  return store.get(name);
}

export async function loginOffline(name, password) {
  const user = await getUserBynameOffline(name);

  if (!user) {
    return {
      success: false,
      message: "Usuário não encontrado no modo offline.",
    };
  }

  if (user.password !== password) {
    return { success: false, message: "Senha incorreta no modo offline." };
  }

  return { success: true, message: "Login offline bem-sucedido!", user };
}
