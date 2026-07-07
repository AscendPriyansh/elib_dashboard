import axios from "axios";
import useTokenStore from "@/store";
import { config } from "@/config/config";

const api = axios.create({
    baseURL: config.server_port,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = useTokenStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = async (data: {email: string; password: string}) => {
    return api.post("/auth/login", data);
};

export const register = async (data: {name: string, email: string; password: string}) => {
    return api.post("/auth/register", data);
};