import { addAllUsers } from "./offline-db.js";

export async function syncUsersFromBackend() {
  try {
    const response = await fetch("http://localhost:3000/users");
    if (!response.ok) {
      throw new Error("Erro ao buscar usuários do backend");
    }

    const users = await response.json();
    await addAllUsers(users);
    console.log("Sincronização de usuários concluída.", users);
  } catch (error) {
    console.error("Erro ao sincronizar usuários:", error);
  }
}