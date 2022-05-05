import { format } from "date-fns"

export const dateToString = (date: string | Date | null) => {
    if (date == null) return '';
    if (typeof date === 'string') {
        const actualDate = date.slice(0,10);
        return format(new Date(actualDate), "yyyy/MM/dd");
    } else {
        return format(new Date(date), "yyyy/MM/dd");
    }
}

export const stringToDate = (date: string | null | undefined) => {
    if (date == null || date == undefined) return null
    return new Date(date);
}

export const numberToDate = (date: number | null | undefined) => {
    if (date == null || date == undefined) return null
    return new Date(date);
}

export const milisecToStringDate = (date: number | null) => {
    if (date == null) return '';
    const formatDate = numberToDate(date);
    if (formatDate) return format(formatDate, "yyyy/MM/dd");
}

export const milisecToStringDateTime = (date: Date | null) => {
    if (date == null) return '';
    return format(date, "yyyy/MM/dd HH:mm:ss");
}