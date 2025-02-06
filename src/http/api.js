import { api } from "./client";

export const login = (credential) => api.post("/auth/login", credential);
export const self = () => api.get("/auth/self");
export const logOut = () => api.post("/auth/logout");
export const getUsers = () => api.get("/user");
export const getTenant = () => api.get("/tenant");
export const cerateUser = (userData) => api.post("/user", userData);
export const createTenant = (tenantData) => api.post("/tenant", tenantData);
