import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_HOST + '/api',
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
