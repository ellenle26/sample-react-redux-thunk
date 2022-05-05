export type CreateCallRequest = {
    callInfoId?: number | null,
    callDateTime?: string | Date | null,
    callInfoStatus?: string,
    responseAccuracy?: string,
    responder?: string,
    responderDevice?: string,
    motive?:string
    scheduledRecallDateTime?: string | Date | null,
    memo?: string
}