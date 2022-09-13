import axios from "axios";
import { API_HOST, API_PORT } from "../config";

export const http = axios.create({
  baseURL: `${API_HOST}:${API_PORT}`,
  timeout: 2000
});

http.interceptors.response.use(
  res => res,
  error => {
    throw error.response.data;
  }
);
