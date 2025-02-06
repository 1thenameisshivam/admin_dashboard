import { api } from "./client";

export const login = (credential) => api.post("/auth/login", credential);
export const self = () => api.get("/auth/self");
export const logOut = () => api.post("/auth/logout");
export const getUsers = () => api.get("/user");
