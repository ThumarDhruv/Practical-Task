import { ApiResponse } from "../types";
import axios from "axios";

const API_BASE_URL = "https://interview.optimavaluepro.com/api/v1/";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const loginUser = async (): Promise<ApiResponse<{ token: string }>> => {
  const response = await api.get<ApiResponse<{ token: string }>>("/auth/login");
  return response.data;
};
