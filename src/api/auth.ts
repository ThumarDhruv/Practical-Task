import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Create an instance of axios
const api = axios.create({
  baseURL: "https://mockapi.com", // This URL is just a placeholder
});

// Set up Mock Adapter
const mock = new MockAdapter(api);

// Mock Login API Response
mock.onPost("/auth/login").reply((config) => {
  const requestData = JSON.parse(config.data);
  const { email, password } = requestData;

  if (email === "admin@gmail.com" && password === "123456") {
    return [200, { token: "mock-token-123" }];
  } else {
    return [401, { message: "Invalid credentials" }];
  }
});

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data; // { token: "mock-token-123" }
  } catch {
    throw new Error("Invalid credentials.");
  }
};
