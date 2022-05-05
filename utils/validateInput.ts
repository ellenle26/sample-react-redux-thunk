import { arrToStr } from "./formatForDisplay";

export const validateEmail = (input: string) => {
    const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    const valid = regex.test(input);
    return valid;
}

export const validatePassword = (input: string) => {
    const regex = new RegExp(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.;!@#$%^&*~/])/);
    const valid = regex.test(input);
    return valid;
}

export const validateRequired = (input: string | Date | undefined | null) => {
    if (input == undefined || !input){ return false }
    if (input.toString() !== '') {
        return true;
    } else return false;
}

export const validateRequiredArr = (input: Array<string> | undefined) => {
    if (input == undefined || input?.length < 1) { return false };
    const inputStr = arrToStr(input);
    if (inputStr !== '') {
        return true;
    } else return false;
}

export const validateNumber = (input: string ) => {
    const inputArr = input.split('');
    let acceptedValue = [''];
    inputArr.map((item: any, index: any) => {
        if (/^[0-9]*$/.test(item)) {
            if (inputArr[index] !== '-') {
                acceptedValue.push(item)
            }
        }
    })
    return acceptedValue.join('');
}

export const validateAccReq = (reqInput: any, type: string) => {
    if (type === 'edit' && !reqInput.id || reqInput.id === '') { return false }
    else if (!reqInput.accountName || reqInput.accountName === '') { return false }
    else if (!reqInput.areas || reqInput.areas.length < 1) { return false }
    else if (!reqInput.accountStatus || reqInput.accountStatus === '') { return false }
    else if (!reqInput.email || reqInput.email === '' || !validateEmail(reqInput.email)) { return false }
    else if (!reqInput.passwordPlain || reqInput.passwordPlain === '' || !validatePassword(reqInput.passwordPlain)) { return false }
    else return true;
}

export const validateCallReq = (reqInput: any, type: string) => {
    if (type === 'edit' && !reqInput.callInfoId || reqInput.callInfoId === '') { return false }
    else if (!reqInput.callDateTime || reqInput.callDateTime === '') { return false }
    else if (!reqInput.callInfoStatus || reqInput.callInfoStatus === '') { return false }
    else if (!reqInput.motive || reqInput.motive === '') { return false }
    // else if (!reqInput.responderDevice || reqInput.responderDevice === '') { return false }
    else if (!reqInput.responseAccuracy || reqInput.responseAccuracy === '') { return false }
    else return true;
}

export const validateCompanyReq = (reqInput: any, type: string) => {
    if (type === 'edit' && !reqInput.companyId || reqInput.companyId === '') { return false }
    else if (!reqInput.corporateNumber || reqInput.corporateNumber === '') { return false }
    else if (!reqInput.companyName || reqInput.companyName === '') { return false }
    else if (!reqInput.companyStatus || reqInput.companyStatus === '') { return false }
    else if (!reqInput.prefecture || reqInput.prefecture === '') { return false }
    else if (!reqInput.city || reqInput.city === '') { return false }
    else if (!reqInput.tel || reqInput.tel === '') { return false }
    else return true;
}
