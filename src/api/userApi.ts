import axios from "axios";
import { User } from "../types";

const API_BASE_URL = "https://interview.optimavaluepro.com/api/v1";

// Create an axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach token before each request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Fetch all users
export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get<{
      success: boolean;
      message: string;
      data: User[];
    }>("/users");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
};

// ✅ Create a new user
export const createUser = async (user: User): Promise<User> => {
  try {
    const response = await api.post<{
      success: boolean;
      message: string;
      data: User;
    }>("/users", user);
    return response.data.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
};

// ✅ Update an existing user
export const updateUser = async (id: number, user: User): Promise<User> => {
  try {
    const response = await api.put<{
      success: boolean;
      message: string;
      data: User;
    }>(`/users/${id}`, user);
    return response.data.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
};

// ✅ Delete a user
export const deleteUser = async (id: number): Promise<void> => {
  try {
    await api.delete(`/users/${id}`);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user");
  }
};
