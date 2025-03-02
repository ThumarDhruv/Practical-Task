import { api } from "./mockapi"; 
import { User } from "../types";

/**  Fetch users */
export const getUsers = async (): Promise<User[]> => {
  const response = await api.get("/users");
  return response.data;
};

/**  Add new user */
export const addUser = async (user: Omit<User, "id">): Promise<User> => {
  const response = await api.post("/users", user);
  return response.data;
};

/** Update user */
export const updateUser = async (
  id: string,
  updatedUser: Partial<User>
): Promise<User> => {
  const response = await api.put(`/users/${id}`, updatedUser);
  return response.data;
};

/**  Delete user */
export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/users/${id}`);
};
