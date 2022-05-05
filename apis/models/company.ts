import { Company, CompanyListItem } from "../../libs/company-type";
import { Filters } from "../../libs/filter-type";

export type FilterResponse = {
    status: number,
    data: Filters
}

export type CompaniesResponseData = {
    isFirst: boolean,
    companies: Array<CompanyListItem>,
    totalItems: number,
    isLast: boolean,
    totalPages: number
}

export type CompaniesResponse = {
    status: number,
    data: CompaniesResponseData
}

export type CompanyResponse = {
    status: number,
    data: Company
}

export type CreateCompanyRequest = {
    companyId?: number | null,
    corporateNumber?: string,
    companyName?: string,
    companyStatus: string | undefined,
    prefecture: string | undefined,
    city: string | undefined,
    addressOther?: string,
    tel: string,
    fax?: string,
    industry?: string,
    branchName?: string,
    accountId?: string,
    callFlag?: string,
    lastCallDateTime?: string | Date | null,
    scheduledRecallDateTime?: string | Date | null
}

export type CompanyQueries = {
    companyStatus: string | null | undefined,
    prefecture: string | null | undefined,
    // industry: string | null,
    branchName: string | null,
    companyName: string | null,
    accountId: string | null | undefined,
    callFlag: string | null | undefined,
    // lastCallDate: number | Date | null | string,
    scheduledRecallDate: number | Date | null | string | undefined,
}