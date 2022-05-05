import api from "./axiosConfig";
import { CreateCallRequest } from "./models/call";


export const getCall = async (companyId: any, callInfoId: any) => {
    return api.get(`/companies/${companyId}/call-info/${callInfoId}`)
}

export const createCall = async (companyId: any, req: CreateCallRequest) => {
    return api.post(`/companies/${companyId}/call-info/`, req);
}

export const deleteCall = async (companyId: any, callInfoId: any) => {
    return api.delete(`/companies/${companyId}/call-info/${callInfoId}`);
}

export const editCall = async (companyId: any, req: CreateCallRequest) => {
    return api.put(`/companies/${companyId}/call-info`, req);
}