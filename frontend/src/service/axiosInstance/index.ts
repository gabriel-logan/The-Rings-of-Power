import axios from "axios";

export const baseURL = "https://api-junior-challenge.vercel.app";

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
