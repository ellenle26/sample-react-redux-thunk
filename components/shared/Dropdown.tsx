import { FormControl, MenuItem, Select } from "@mui/material";
import React, { useEffect } from "react";
import { Option, PicOption } from "../../libs/filter-type";
import { validateRequired } from "../../utils/validateInput";
import styles from "./dropdown.module.scss";


const Dropdown = (props: DropdownProps) => {
    const { label, data, value, handleChange, required, filter, defaultVal, from } = props;
    const [focused, setFocused] = React.useState<boolean>(false);
    const [blur, setBlur] = React.useState<boolean>(false);

    useEffect(() => {
        if (value === '' || !value) {
            if (defaultVal) {
                handleChange(defaultVal)
            }
        }
    },[])


    return <div className={filter ? `${styles.dropdown}` : `${styles.dropdown_group}`}>
        <div className={filter ? `${styles.label}` : `${styles.label} ${styles.label_height}`}><div>{label}{required && <span>*</span>}</div></div>
        {
            label === "記入者" ?
                <FormControl variant="outlined" fullWidth>
                    <Select value={value} onChange={(e: any) => handleChange(e.target.value)}
                        error={focused && required && !validateRequired(value) ? true : false}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setBlur(true)}
                    >
                        <MenuItem value="">クリア</MenuItem>
                        {data && data.map((item: PicOption, index: number) => <MenuItem key={index} value={item.accountName}>{item.accountName}</MenuItem>)}
                    </Select>
                    {required && !validateRequired(value) && blur && <span className={styles.err_mess}>{label + ": 入力必須です"}</span>}
                </FormControl> :
                <FormControl variant="outlined" fullWidth>
                    <Select
                        value={value}
                        onChange={(e: any) => handleChange(e.target.value)}
                        error={focused && required && !validateRequired(value) ? true : false}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setBlur(true)}
                    >
                        {from !== 'user' && from !== 'call' && from !== 'callAccurate'? <MenuItem value="">クリア</MenuItem> : ''}
                        {data && data.map((item: Option, index: number) => <MenuItem key={index} value={item.name}>{item.name}</MenuItem>)}
                    </Select>
                    {required && !validateRequired(value) && blur && <span className={styles.err_mess}>{label + ": 入力必須です"}</span>}
                </FormControl>
        }
    </div>
}

export interface DropdownProps {
    label: string;
    data: any;
    value?: string;
    handleChange: any;
    required?: boolean;
    filter?: boolean;
    defaultVal?: string;
    from?: string
}

export default Dropdown;