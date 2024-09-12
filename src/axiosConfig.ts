import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URI,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
