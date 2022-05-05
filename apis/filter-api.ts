import api from "./axiosConfig"

export const getFilters = async () => {
    return api.get('/companies/filter-options');
} 