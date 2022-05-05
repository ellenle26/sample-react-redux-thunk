export type Option = {
    name: string,
    id: string
}

export type PicOption = {
    accountName: string,
    id: string
}

export type Filters = {
    areas: Array<Option>,
    personInCharges: Array<PicOption>,
    callFlags: Array<Option>,
    lastCallDateTime: string,
    scheduledRecallDateTime: string,
    companyStatus: Array<Option>,
    accountStatus: Array<Option>,
    callInfoStatus: Array<Option>,
    callInfoAccuracy: Array<Option>,
    callInfoMotive: Array<Option>,
    callInfoResponderDevice: Array<Option>
}