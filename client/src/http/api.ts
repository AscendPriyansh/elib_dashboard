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

export const getBooks = async (page: number = 1, limit: number = 10) => {
    return api.get("/api/book", { params: { page, limit } });
};

export const createBook = async (data: FormData) => {
    return api.post("/api/book", data, {
        headers: { "Content-Type": undefined },
    });
};

export const getSingleBook = async (bookId: string) => {
    return api.get(`/api/book/${bookId}`);
};

export const updateBook = async ({ bookId, data }: { bookId: string; data: FormData }) => {
    return api.patch(`/api/book/${bookId}`, data, {
        headers: { "Content-Type": undefined },
    });
};

export const deleteBook = async (bookId: string) => {
    return api.delete(`/api/book/${bookId}`);
};