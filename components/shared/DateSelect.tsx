import React from "react";
import styles from "./dateSelect.module.scss";
import { TextField } from "@mui/material";
import { DatePicker, DateTimePicker } from "@mui/lab";
import { validateRequired } from "../../utils/validateInput";
import { isValid } from "date-fns";
import { dateToString } from "../../utils/formatDate";


const DateSelect = (props: DateSelectProps) => {
    const { label, selectedDate, handleDateChange, filter, required, time } = props;
    const [dateplaceholder, setDatePlaceholder] = React.useState<string>(selectedDate ? '' : '例）2021/01/01');
    const [dateTimeplaceholder, setDateTimePlaceholder] = React.useState<string>(selectedDate ? '' : '例）2021/01/01 14:00');
    const [focused, setFocused] = React.useState<boolean>(false);
    const [blur, setBlur] = React.useState<boolean>(false);

    return <div className={filter ? `${styles.date_select}` : `${styles.date_group}`}>
        <div className={filter ? `${styles.label}` : `${styles.label} ${styles.label_height}`}><div>{label}{required && <span>*</span>}</div></div>
        {time ? <DateTimePicker
            onChange={date => {
                if (isValid(date) && dateToString(date).length >= 10)
                { handleDateChange(date); setDateTimePlaceholder('') }
                else { handleDateChange(null) }
            }}
            value={selectedDate}
            mask="___/__/__ __:__"
            renderInput={(params: any) => <TextField fullWidth {...params}
                label={dateTimeplaceholder}
                InputLabelProps={{shrink: false}}
                error={focused && required && !validateRequired(selectedDate) ? true : false}
                onFocus={() => { setFocused(true); setDateTimePlaceholder('') }}
                onBlur={(e) => { 
                    setBlur(true); 
                    selectedDate ? setDateTimePlaceholder('') : setDateTimePlaceholder('例）2021/01/01 14:00');
                    e.target.value.length > 0 ? setDateTimePlaceholder('') : setDateTimePlaceholder('例）2021/01/01 14:00')}}
            />}
        /> :
        <DatePicker
            onChange={date => {
                if (isValid(date) && dateToString(date).length >= 10)
                { handleDateChange(date); setDatePlaceholder('') }
                else {handleDateChange(null)}
            }}
            value={ selectedDate}
            mask="____/__/__"
            renderInput={(params) => <TextField fullWidth {...params}
                label={dateplaceholder}
                InputLabelProps={{ shrink: false }}
                error={focused && required && !validateRequired(selectedDate) ? true : false}
                onFocus={() => { setFocused(true); setDatePlaceholder('')}}
                onBlur={(e) => { 
                    setBlur(true); 
                    selectedDate ? setDatePlaceholder('') : setDatePlaceholder('例）2021/01/01'); 
                    e.target.value.length > 0 ? setDatePlaceholder('') : setDatePlaceholder('例）2021/01/01')}}
            />}
        />
        }  
        {required && !validateRequired(selectedDate) && blur && <><span></span><span className={styles.err_mess}>{label + ": 入力必須です"}</span></>}
    </div>
}

export interface DateSelectProps {
    label: string;
    selectedDate: Date | null;
    handleDateChange: any;
    filter?: boolean;
    required?: boolean;
    time?:boolean
}

export default DateSelect;