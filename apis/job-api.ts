import api from "./axiosConfig"

export const getJobs = async (page: number, companyId: any) => {
    return api.get(`/companies/${companyId}/jobs-infos?page=${page}`);
}

export const getJobDetails = async (companyId: any, jobInfoId: any) => {
    return api.get(`/companies/${companyId}/job-infos/${jobInfoId}`);
}
