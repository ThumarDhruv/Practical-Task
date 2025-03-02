import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { User } from "../types";

// Mock API Base URL
const API_BASE_URL = "https://640c58c5a3e07380e8f84778.mockapi.io/api/v1/users";

// Create Axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Create Mock Adapter
const mock = new MockAdapter(api, { delayResponse: 500 }); // Simulate network delay

// Mock User Data (Stored in LocalStorage)
const getLocalUsers = (): User[] => {
  return JSON.parse(localStorage.getItem("users") || "[]");
};

const saveLocalUsers = (users: User[]) => {
  localStorage.setItem("users", JSON.stringify(users));
};

// 📌 Mock GET: Fetch Users
mock.onGet("/users").reply(() => {
  const users = getLocalUsers();
  return [200, users];
});

//  Mock POST: Add User
mock.onPost("/users").reply((config) => {
  const newUser: Omit<User, "id"> = JSON.parse(config.data);
  const users = getLocalUsers();

  // Assign unique ID
  const id = String(users.length + 1);
  const createdUser = { ...newUser, id };

  users.push(createdUser);
  saveLocalUsers(users);

  return [201, createdUser];
});

//  Mock PUT: Update User
mock.onPut(/\/users\/\d+/).reply((config) => {
  const id = config.url!.split("/").pop();
  const updatedUser: Partial<User> = JSON.parse(config.data);
  let users = getLocalUsers();

  users = users.map((u) => (u.id === id ? { ...u, ...updatedUser } : u));
  saveLocalUsers(users);

  return [200, users.find((u) => u.id === id)];
});

//  Mock DELETE: Delete User
mock.onDelete(/\/users\/\d+/).reply((config) => {
  const id = config.url!.split("/").pop();
  let users = getLocalUsers();

  users = users.filter((u) => u.id !== id);
  saveLocalUsers(users);

  return [200, { message: "User deleted successfully" }];
});
