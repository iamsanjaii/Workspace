import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:"http://localhost:4700/api",
    withCredentials:true
})