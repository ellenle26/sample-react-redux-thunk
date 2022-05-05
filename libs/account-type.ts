export type AccountStatus = {
    id: number,
    name: string,
}

export type Account = {
    accountId: number,
    accountName: string,
    areas: Array<string>,
    email: string,
    passwordPlain: string,
    accountStatus: string,
    lastLoginDateTime: string
}

export type User = {
    role: string,
    accountName: string,
    id: number,
    email: string,
    token: string,
}