import { Option, PicOption } from "../libs/filter-type";

export const arrToStr = (input: Array<string> | undefined) => {
    if (input == undefined || input.length < 1) { return };
    let finalString = '';
    input.forEach(element => {
        finalString += element;
    });
    return finalString;
}

export const arrObjToArrName = (input: Array<Option> | undefined) => {
    if (input == undefined || input.length < 1) { return }
    let arrStr: Array<string> = [];
    input.forEach(element => {
        arrStr.push(element.name);
    });
    return arrStr;
}

export const arrObjToStr = (input: Array<Option> | undefined) => {
    const arrStr = arrObjToArrName(input);
    const str = arrToStr(arrStr);
    return str;
}

export const dataOfMultiChoice = (name: Array<string> | undefined, orgData: Array<Option>|undefined) => {
    let data: Array<string> = [];
    if (orgData == undefined || name == undefined) { return []}
    for (let i=0; i<name.length; i++) {
        orgData.forEach(item => {
            if (item.name === name[i]) {
                data.push(item.id);
            }
        });
    }
    return data;
}

export const keyOfSelect = (name: string | undefined |  null, orgData: Array<Option> | undefined) => {
    if (orgData == undefined || name == undefined || name == null) { return '' }
    let selectedId = orgData.find((item, index) => item.name === name);
    return selectedId?.id;
}

export const keyOfSelectPic = (name: string | undefined | null, orgData: Array<PicOption> | undefined) => {
    if (orgData == undefined || name == undefined || name == null) { return '' }
    let selectedId = orgData.find((item, index) => item.accountName === name);
    return selectedId?.id;
}

export const valueOfSelect = (id: any, orgData: Array<Option> | undefined) => {
    if (orgData == undefined || id == undefined || id == null) { return '' }
    let selectedVal = orgData.find((item, index) => item.id === id);
    return selectedVal?.name;
}

export const valueOfSelectPic = (id: any, orgData: Array<PicOption> | undefined) => {
    if (orgData == undefined || id == undefined || id == null) { return '' }
    let selectedVal = orgData.find((item, index) => item.id === id);
    return selectedVal?.accountName;
}