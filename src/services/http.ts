import axios from "axios";

const API_PORT = 3000;

export const http = axios.create({
  baseURL: `http://localhost:${API_PORT}`,
  timeout: 2000
});

http.interceptors.response.use(
  res => res,
  error => {
    throw error.response.data;
  }
);
