import { api } from "./client";

export const login = (credential) => api.post("/auth/login", credential);
export const self = () => api.get("/auth/self");
export const logOut = () => api.post("/auth/logout");
export const getUsers = (query) => api.get(`/user?${query}`);
export const getTenant = (query) => api.get(`/tenant?${query}`);
export const cerateUser = (userData) => api.post("/user", userData);
export const createTenant = (tenantData) => api.post("/tenant", tenantData);
export const updateUser = (userId, userData) =>
  api.patch(`/user/${userId}`, { ...userData });
