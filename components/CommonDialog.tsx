import { Button, Dialog } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { CreateCallRequest } from "../apis/models/call";
import { CreateCompanyRequest } from "../apis/models/company";
import { RootState } from "../apis/store";
import { milisecToStringDateTime, stringToDate } from "../utils/formatDate";
import { arrObjToArrName, dataOfMultiChoice, keyOfSelect } from "../utils/formatForDisplay";
import { validateAccReq, validateCallReq, validateCompanyReq } from "../utils/validateInput";
import styles from "./commonDialog.module.scss";
import DateSelect from "./shared/DateSelect";
import Dropdown from "./shared/Dropdown";
import InputGroup from "./shared/InputGroup";
import MultiDropdown from "./shared/MultiDropdown";

const CommonDialog = (props: CommonDialogProps) => {
    const { open, onClose, onAccept, action, title, dialogType, editData } = props;

    // hooks
    const filterOptions = useSelector((state: RootState) => state.filter.filterOptions);
    
    // company info states 
    const [comapnyId, setCompanyId] = React.useState<number | null>(null);
    const [corporateNumber, setCorporateNumber] = React.useState<string>('');
    const [companyName, setCompanyName] = React.useState<string>('');
    const [industry, setIndustry] = React.useState<string>('');
    const [branchName, setBranchName] = React.useState<string>('');
    const [companyStatus, setCompanyStatus] = React.useState<string>('');
    const [prefecture, setPrefecture] = React.useState<string>('');
    const [city, setCity] = React.useState<string>('');
    const [addressOther, setAddressOther] = React.useState<string>('');
    const [tel, setTel] = React.useState<string>('');
    const [fax, setFax] = React.useState<string>('');
    const [callFlag, setCallFlag] = React.useState<string>('');
    const [lastCallDate, setLastCallDate] = React.useState<Date | null>(null);
    const [scheduledRecallDate, setScheduledRecallDate] = React.useState<Date | null>(null);
    // const [pic, setPic] = React.useState<string>('');
    // call info state 
    const [callInfoId, setCallInfoId] = React.useState<number | null>(null);
    const [callDate, setCallDate] = React.useState<Date | null>(null);
    const [callInfoStatus, setCallInfoStatus] = React.useState<string>('');
    const [responseAccuracy, setResponseAccuracy] = React.useState<string>('');
    const [responder, setResponder] = React.useState<string>('');
    // const [responderDevice, setResponderDevice] = React.useState<string>('');
    const [motive, setMotive] = React.useState<string>('');
    const [newScheduledRecallDate, setNewScheduledRecallDate] = React.useState<Date | null>(null);
    const [memo, setMemo] = React.useState<string>('');
    // user info state
    const [accountId, setAccountId] = React.useState<number | null>(null);
    const [accountName, setAccountName] = React.useState<string>('');
    const [areas, setAreas] = React.useState<Array<string> | undefined>([]);
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [accountStatus, setAccountStatus] = React.useState<string>('');

    const [disableAccountAction, setDisableAccountAction] = React.useState<boolean>(true);
    const [disableCompanyAction, setDisableCompanyAction] = React.useState<boolean>(true);
    const [disableCallAction, setDisableCallAction] = React.useState<boolean>(true);

    // functions
    const handleOnAccept = (value: string) => {
        if (value === 'no') {
            onAccept("no", null);
        } else {
            if (dialogType === 'user') {
                let req: any = {
                        accountName: accountName,
                        areas: dataOfMultiChoice(areas, filterOptions?.areas),
                        accountStatus: keyOfSelect(accountStatus, filterOptions?.accountStatus),
                        email: email,
                        passwordPlain: password
                }
                if (action === "edit") {
                    req.id = accountId;
                    if (validateAccReq(req, "edit")) {
                        onAccept("yes", req);
                    }
                } else {
                    if (validateAccReq(req, "add")) {
                        onAccept("yes", req);
                    }
                }
            }
            if (dialogType === 'company') {
                const req: CreateCompanyRequest = {
                    corporateNumber: corporateNumber,
                    companyName: companyName,
                    companyStatus: keyOfSelect(companyStatus, filterOptions?.companyStatus),
                    prefecture: prefecture,
                    city: city,
                    addressOther: addressOther,
                    tel: tel,
                    fax: fax,
                    industry: industry,
                    branchName: branchName,
                    // accountId: keyOfSelectPic(pic, filterOptions?.personInCharges),
                    callFlag: keyOfSelect(callFlag, filterOptions?.callFlags),
                    lastCallDateTime: lastCallDate ? milisecToStringDateTime(lastCallDate) : '',
                    scheduledRecallDateTime: scheduledRecallDate ? milisecToStringDateTime(scheduledRecallDate) : ''
                }
                if (action === "edit") {
                    req.companyId = comapnyId;
                    if (validateCompanyReq(req, "edit")) {
                        onAccept("yes", req);
                    }
                } else {
                    if (validateCompanyReq(req, "add")) {
                        onAccept("yes", req);
                    }
                }
            }
            if (dialogType === 'call') {
                const req: CreateCallRequest = {
                    callDateTime: milisecToStringDateTime(callDate),
                    callInfoStatus: keyOfSelect(callInfoStatus, filterOptions?.callInfoStatus),
                    memo: memo,
                    motive: keyOfSelect(motive, filterOptions?.callInfoMotive),
                    responder: responder,
                    // responderDevice: keyOfSelect(responderDevice, filterOptions?.callInfoResponderDevice),
                    responseAccuracy: keyOfSelect(responseAccuracy, filterOptions?.callInfoAccuracy),
                    scheduledRecallDateTime: milisecToStringDateTime(newScheduledRecallDate)
                }
                if (action === "edit") {
                    req.callInfoId = callInfoId;
                    console.log(validateCallReq(req, "edit"))
                    if (validateCallReq(req, "edit")) {
                        onAccept("yes", req);
                    }
                } else {
                    if (validateCallReq(req, "add")) {
                        onAccept("yes", req);
                    }
                }
            }
        }
    }

    const setInitialData = () => {
        if (action === 'edit' && editData != null) {
            if (dialogType === 'user') {
                editData.accountId && setAccountId(editData.accountId)
                editData.accountName && setAccountName(editData.accountName);
                editData.accountStatus && setAccountStatus(editData.accountStatus);
                editData.areas && setAreas(arrObjToArrName(editData.areas));
                editData.email && setEmail(editData.email);
                editData.passwordPlain && setPassword(editData.passwordPlain);
            }
            if (dialogType === 'company') {
                editData.companyId && setCompanyId(editData.companyId)
                editData.corporateNumber && setCorporateNumber(editData.corporateNumber);
                editData.companyName && setCompanyName(editData.companyName);
                editData.companyStatus && setCompanyStatus(editData.companyStatus);
                editData.prefecture && setPrefecture(editData.prefecture);
                editData.tel && setTel(editData.tel);
                editData.fax && setFax(editData.fax);
                // editData.personInCharge && setPic(editData.personInCharge);
                editData.city && setCity(editData.city);
                editData.addressOther && setAddressOther(editData.addressOther);
                editData.industry && setIndustry(editData.industry);
                editData.branchName && setBranchName(editData.branchName);
                editData.callFlag && setCallFlag(editData.callFlag);
                editData.lastCallDate && setLastCallDate(stringToDate(editData.lastCallDate));
                setScheduledRecallDate(stringToDate(editData.scheduledRecallDate));
            }
            if (dialogType === 'call') {
                editData.callInfoId && setCallInfoId(editData.callInfoId);
                setCallDate(stringToDate(editData.callDateTime));
                editData.callInfoStatus?.name && setCallInfoStatus(editData.callInfoStatus?.name);
                editData.responseAccuracy?.name && setResponseAccuracy(editData.responseAccuracy?.name);
                editData.responder && setResponder(editData.responder);
                // editData.responderDevice.name && setResponderDevice(editData.responderDevice.name);
                editData.motive?.name && setMotive(editData.motive?.name);
                setNewScheduledRecallDate(stringToDate(editData.scheduledRecallDateTime));
                editData.memo && setMemo(editData.memo);
            }
        }
    }

    // useEffect
    React.useEffect(() => {
        setInitialData();
    }, [editData])

    React.useEffect(() => {
        let req: any = {
            accountName: accountName,
            areas: dataOfMultiChoice(areas, filterOptions?.areas),
            accountStatus: keyOfSelect(accountStatus, filterOptions?.accountStatus),
            email: email,
            passwordPlain: password
        }
        if (validateAccReq(req, "add")) {
            setDisableAccountAction(false);
        } else {
            setDisableAccountAction(true);
        }
    },[accountName, areas, email, password, accountStatus])

    React.useEffect(() => {
        const req: CreateCompanyRequest = {
            corporateNumber: corporateNumber,
            companyName: companyName,
            companyStatus: keyOfSelect(companyStatus, filterOptions?.companyStatus),
            prefecture: prefecture,
            city: city,
            addressOther: addressOther,
            tel: tel,
            fax: fax,
            industry: industry,
            callFlag: keyOfSelect(callFlag, filterOptions?.callFlags),
            lastCallDateTime: lastCallDate ? milisecToStringDateTime(lastCallDate) : '',
            scheduledRecallDateTime: scheduledRecallDate ? milisecToStringDateTime(scheduledRecallDate) : ''
        }
        if (validateCompanyReq(req, "add")) {
            setDisableCompanyAction(false);
        } else {
            setDisableCompanyAction(true);
        }
    }, [corporateNumber, companyName, industry, companyStatus, prefecture, city, addressOther, tel, fax, callFlag])

    React.useEffect(() => {
        const req: CreateCallRequest = {
            callDateTime: milisecToStringDateTime(callDate),
            callInfoStatus: keyOfSelect(callInfoStatus, filterOptions?.callInfoStatus),
            memo: memo,
            motive: keyOfSelect(motive, filterOptions?.callInfoMotive),
            responder: responder,
            responseAccuracy: keyOfSelect(responseAccuracy, filterOptions?.callInfoAccuracy),
            scheduledRecallDateTime: milisecToStringDateTime(newScheduledRecallDate)
        }
        console.log(req.callDateTime)
        if (validateCallReq(req, "add")) {
            setDisableCallAction(false)
        } else {
            setDisableCallAction(true)
        }
    }, [callDate, callInfoStatus, responseAccuracy, responder, motive, memo])

    React.useEffect(() => {
        if (!open) {
            setIndustry('');
            setCity('');
            setAddressOther('');
            setAccountName('');
            setAccountStatus('');
            setAreas([]);
            setEmail('');
            setPassword('');
            setCorporateNumber('');
            setCompanyName('');
            setCompanyStatus('');
            setPrefecture('');
            setBranchName('');
            // setPic('');
            setTel('');
            setFax('');
            setCallFlag('');
            setLastCallDate(null);
            setScheduledRecallDate(null);
            setCallDate(null);
            setCallInfoStatus('');
            setResponseAccuracy('');
            setResponder('');
            // setResponderDevice('');
            setMotive('');
            setNewScheduledRecallDate(null);
            setMemo('');
        }
    },[open])

    return <Dialog open={open} onClose={() => onClose(false)} fullWidth maxWidth="lg">
        <div className={styles.title}>{title}</div>
        {
            dialogType === "company" ?
            <div className={styles.dialog_info}>
                <InputGroup value={corporateNumber} label="法人番号" type="number" handleInputChange={setCorporateNumber} required />
                <InputGroup value={industry} label="業種" type="input" handleInputChange={setIndustry} />
                <InputGroup value={companyName} label="企業名" type="input" handleInputChange={setCompanyName} required />
                <InputGroup value={tel} label="電話番号" type="number" handleInputChange={setTel} required />
                <InputGroup value={branchName} label="支店名" type="input" handleInputChange={setBranchName} />
                <InputGroup value={fax} label="FAX番号" type="number" handleInputChange={setFax} />
                <InputGroup value={prefecture} label="都道府県" type="input" handleInputChange={setPrefecture} required />
                <Dropdown label="ステータス" data={filterOptions?.companyStatus} handleChange={setCompanyStatus} value={companyStatus} required />
                <InputGroup value={city} label="市区町村" type="input" handleInputChange={setCity} required />
                <DateSelect time label="最終架電日" selectedDate={lastCallDate} handleDateChange={setLastCallDate} />
                <InputGroup value={addressOther} label="番地など" type="input" handleInputChange={setAddressOther} />
                <DateSelect time label="再架電予定日" selectedDate={scheduledRecallDate} handleDateChange={setScheduledRecallDate} />
                <Dropdown label="架電フラグ" data={filterOptions?.callFlags} handleChange={setCallFlag} value={callFlag} />
                {/* <Dropdown value={pic} label="記入者" handleChange={setPic} data={filterOptions?.personInCharges} /> */}
            </div> : dialogType === "call" ?
            <div className={styles.dialog_info_call}>
                <div>
                    <DateSelect time label="架電日時" selectedDate={callDate} handleDateChange={setCallDate} required/>
                    <InputGroup value={responder} label="先方応対者" type="input" handleInputChange={setResponder} />
                </div>
                <div>
                    <Dropdown from="call" label="ステータス" data={filterOptions?.callInfoStatus} handleChange={setCallInfoStatus} value={callInfoStatus} required/>
                    <Dropdown value={motive} label="きっかけ" data={filterOptions?.callInfoMotive} handleChange={setMotive} required/>
                </div>
                <div>
                    <Dropdown value={responseAccuracy} from="callAccurate" data={filterOptions?.callInfoAccuracy} label="確度（反応）" handleChange={setResponseAccuracy} required/>
                    <DateSelect time label="再架電予定日" selectedDate={newScheduledRecallDate} handleDateChange={setNewScheduledRecallDate} />
                </div>
                {/* <Dropdown value={responderDevice} label="先方端末" data={filterOptions?.callInfoResponderDevice} handleChange={setResponderDevice} required/> */}
                <div className={styles.memo}><InputGroup value={memo} label="メモ" type="textArea" handleInputChange={setMemo} /></div>
            </div> : dialogType === "user" ?
            <div className={styles.dialog_info}>
                <InputGroup value={accountName} label="記入者名" type="input" handleInputChange={setAccountName} required />
                <InputGroup value={password} label="パスワード" type="inputPW" handleInputChange={setPassword} required />
                <MultiDropdown arrVal={areas} label="エリア" data={arrObjToArrName(filterOptions?.areas)} handleChange={setAreas} required />
                <Dropdown data={filterOptions?.accountStatus} defaultVal="有効" from="user" value={accountStatus} label="ステータス" handleChange={setAccountStatus} required />
                <InputGroup value={email} label="ログインメールアドレス" type="input" handleInputChange={setEmail} required disable={action === 'edit' ? true : false}/>
            </div> : <></>
        }
        <div className={styles.actions}>
            <Button 
                variant="outlined" 
                color="primary" 
                className={styles.dialog_button} 
                onClick={() => handleOnAccept("no")}
            >キャンセル</Button>
            <Button
                variant="contained"
                color="primary"
                className={styles.dialog_button}
                onClick={() => handleOnAccept("yes")}
                disabled={dialogType === 'user' ? disableAccountAction : dialogType === 'company' ? disableCompanyAction : disableCallAction}
            >保存</Button>
        </div>
    </Dialog>
}

export interface CommonDialogProps {
    dialogType: string;
    title: string;
    open: boolean;
    onClose: any;
    onAccept: (value: string, req: any) => void;
    action: string;
    editData?: any
}

export default CommonDialog;