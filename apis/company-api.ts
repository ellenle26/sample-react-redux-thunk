import { isValid } from "date-fns";
import api from "./axiosConfig";
import { CompanyQueries, CreateCompanyRequest } from "./models/company";

export const getAllCompanies = async (page: number, queries: CompanyQueries | null) => {
    if (queries == null) {
        return api.get(`/companies?page=${page}`);      
    } else {
        let req: any = {};
        for (const [key, value] of Object.entries(queries)) {
            if (value != null && value != undefined && value !== '') {
                req[key] = value;
            }
        }
        // if (isValid(queries?.lastCallDate) && queries?.lastCallDate != 0) { req.lastCallDate = queries?.lastCallDate } else { delete req.lastCallDate};
        // if (isValid(queries?.scheduledRecallDate) && queries?.scheduledRecallDate != 0) { req.scheduledRecallDate = queries?.scheduledRecallDate } else { delete req.scheduledRecallDate };
        if (Object.keys(req).length === 0) {
            return api.get(`/companies?page=${page}`);
        } else {
            return api.post(`/companies/search?page=${page}`, req);
        }
    }
}

export const getCompanyById = async (req: any) => {
    return api.get(`/companies/${req}`);
}

export const updateCompanyInfo = async (req: CreateCompanyRequest) => {
    return api.put("/companies", req);
}

export const createCompany = async (req: CreateCompanyRequest) => {
    return api.post("/companies", req);
}

export const downloadCompaniesData = async (req: any) => {
    let downloadOptions: any = {};
    for (const [key, value] of Object.entries(req)) {
        if (value != null && value != undefined && value !== '') {
            downloadOptions[key] = value;
        }
    }
    // if (isValid(downloadOptions?.lastCallDate) && downloadOptions?.lastCallDate != 0) { req.lastCallDate = downloadOptions?.lastCallDate } else { req.lastCallDate = '' };
    // if (isValid(downloadOptions?.scheduledRecallDate) && downloadOptions?.scheduledRecallDate != 0) { req.scheduledRecallDate = downloadOptions?.scheduledRecallDate } else { req.scheduledRecallDate = '' };
    // if (Object.keys(req).length === 0) {
    //     return api.post('/companies/download', { responseType: 'arraybuffer' })
    // } else {
    //     return api.post('/companies/download', downloadOptions, { responseType: 'arraybuffer' })
    // }
    return api.post('/companies/download', downloadOptions, { responseType: 'arraybuffer' })
} 