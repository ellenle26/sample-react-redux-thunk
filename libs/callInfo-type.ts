import { Option } from "./filter-type"


export type CallInfo = {
    callInfoId: number,
    callDateTime: string,
    callInfoStatus: Option,
    responseAccuracy: Option,
    responder: string,
    responderDevice?: Option,
    writer? : string,
    motive: Option,
    scheduledRecallDateTime: string,
    memo: string,
}