import axios from "axios";
import { API_ENDPOINT } from "../config";

export const http = axios.create({
  baseURL: `${API_ENDPOINT}`,
  timeout: 2000
});

http.interceptors.response.use(
  res => res,
  error => {
    throw error.response.data;
  }
);
