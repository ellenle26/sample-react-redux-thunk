import { TextareaAutosize, TextField } from "@mui/material";
import React from "react";
import { validateEmail, validateNumber, validatePassword, validateRequired } from "../../utils/validateInput";
import styles from "./inputGroup.module.scss";

const InputGroup = (props: InputgroupPrpops) => {
    const { label, type, placeholder, handleInputChange, value, required, filter, disable } = props;
    const [focused, setFocused] = React.useState<boolean>(false);
    const [blur, setBlur] = React.useState<boolean>(false);

    return <div className={filter ? `${styles.input_container}` : type === "input" || type === "inputPW" || type === "number" ? `${styles.input_container_group}` : `${styles.input_container_group_area}`}>
        <div className={filter ? `${styles.input_label}` : `${styles.input_label} ${styles.label_height}`}><div>{label}{required && <span>*</span>}</div></div>
        {type === "input" || type === "inputPW" || type === "number" ?
            <TextField 
                fullWidth
                type={type === "inputPW" ? "password" : "text"}
                value={value}
                variant="outlined" 
                // autoComplete={"new-password"}
                disabled={disable}
                placeholder={placeholder}
                autoComplete={"new-password"}
                onChange={(e: any) => {
                    if (type === "number") {
                        handleInputChange(validateNumber(e.target.value));
                    } else {
                        handleInputChange(e.target.value)
                    }
                }}
                error={focused && required && !validateRequired(value) ? true : false}
                onFocus={() => setFocused(true)}
                onBlur={() => setBlur(true)}
            /> :
            <TextareaAutosize 
                value={value} 
                placeholder={placeholder}
                onChange={(e: any) => handleInputChange(e.target.value)}
            />
        }
        {required && !validateRequired(value) && blur && <><span></span><span className={styles.err_mess}>{label + ": 入力必須です"}</span></>}
        {label === 'パスワード' && validateRequired(value) && !validatePassword(value) && blur && <><span></span><span className={styles.err_mess}>{label + ": 半角英字の大文字・小文字、半角数字、記号は各1文字ずつの設定が必須です。"}</span></>}
        {label === 'ログインメールアドレス' && validateRequired(value) && !validateEmail(value) && blur && <><span></span><span className={styles.err_mess}>{label + ": メールアドレスを正しく入力してください。"}</span></>}
    </div>
}

export interface InputgroupPrpops {
    label: string;
    type: string;
    placeholder?: string;
    handleInputChange: any;
    value: string;
    required?: boolean;
    filter?: boolean;
    disable?: boolean
}

export default InputGroup;