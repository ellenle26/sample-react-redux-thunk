import { CallInfo } from "./callInfo-type"
import { Option } from "./filter-type"
import { JobInfo } from "./jobInfo-type"


export type Company = {
    companyId: number,
    corporateNumber: string,
    industry?: string,
    branchName?: string,
    prefecture?: string,
    city?: string,
    addressOther?: string,
    personInCharge?: string,
    companyName: string,
    companyStatus: Option,
    address: string,
    tel: string,
    fax: string,
    callFlag: Option,
    lastCallDateTime: string,
    scheduledRecallDateTime: string,
    callInfo: Array<CallInfo>,
    jobInfo: Array<JobInfo>
}

export type CompanyListItem = {
    companyId: number,
    industry?: string,
    branchName: string,
    companyName: string,
    companyStatus: string,
    tel: string,
    callFlag: string,
    address: string,
    lastCallDateTime: string,
    scheduledRecallDateTime: string
}