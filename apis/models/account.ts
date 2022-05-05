import { Account, User } from "../../libs/account-type"

export type LoginRequest = {
    email: string,
    password: string
}

export type LoginResponse = {
    status: number,
    data: User,
}

export type CreateAccRequest = {
    accountName: string,
    areas: Array<string>,
    email: string,
    passwordPlain: string,
    accountStatus: string,
}

export type CreateAccResponse = {
    status: number,
    data: {
        message: string,
    }
}

export type AccountsResponseData = {
    isFirst: boolean,
    totalItems: number,
    isLast: true,
    totalPages: number,
    accounts: Array<Account>
}

export type AccountsResponse = {
    status: number,
    data: AccountsResponseData
}

export type UpdateAccRequest = {
    id: number
    accountName: string,
    areas?: Array<string>,
    passwordPlain: string,
    accountStatus?: string,
}