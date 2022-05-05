import api from "./axiosConfig";
import { CreateAccRequest, LoginRequest, UpdateAccRequest } from "./models/account";

export const authenticate = async (req: LoginRequest) => {
    return api.post('/accounts/authenticate', req);
}

export const createAccount = async (req: CreateAccRequest) => {
    return api.post('/accounts', req);
}

export const getAllAccounts = async (page: number) => {
    return api.get(`/accounts?page=${page}`);
}

export const deleteAccountById = (accountId:any) => {
    return api.delete(`/accounts/${accountId}`);
}

export const getAccountById = (accountId: any) => {
    return api.get(`/accounts/${accountId}`);
}

export const editAccountById = (req: UpdateAccRequest) => {
    return api.put('/accounts', req);
}