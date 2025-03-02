import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { User } from "../types";

// Mock API Base URL
const API_BASE_URL = "https://640c58c5a3e07380e8f84778.mockapi.io/api/v1/users";

// Create Axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
});

const mock = new MockAdapter(api, { delayResponse: 500 });

const getLocalUsers = (): User[] => {
  return JSON.parse(localStorage.getItem("users") || "[]");
};

const saveLocalUsers = (users: User[]) => {
  localStorage.setItem("users", JSON.stringify(users));
};

mock.onGet("/users").reply(() => {
  const users = getLocalUsers();
  return [200, users];
});

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

mock.onPut(/\/users\/\d+/).reply((config) => {
  const id = config.url!.split("/").pop();
  const updatedUser: Partial<User> = JSON.parse(config.data);
  let users = getLocalUsers();

  users = users.map((u) => (u.id === id ? { ...u, ...updatedUser } : u));
  saveLocalUsers(users);

  return [200, users.find((u) => u.id === id)];
});

mock.onDelete(/\/users\/\d+/).reply((config) => {
  const id = config.url!.split("/").pop();
  let users = getLocalUsers();

  users = users.filter((u) => u.id !== id);
  saveLocalUsers(users);

  return [200, { message: "User deleted successfully" }];
});
