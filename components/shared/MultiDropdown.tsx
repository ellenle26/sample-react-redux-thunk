import { Checkbox, FormControl, FormControlLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import React from "react";
import { Option, PicOption } from "../../libs/filter-type";
import { validateRequired, validateRequiredArr } from "../../utils/validateInput";
import styles from "./dropdown.module.scss";


const MultiDropdown = (props: DropdownProps) => {
    const { label, data, value, handleChange, required, filter, arrVal } = props;
    const [focused, setFocused] = React.useState<boolean>(false);
    const [blur, setBlur] = React.useState<boolean>(false);


    return <div className={filter ? `${styles.dropdown}` : `${styles.dropdown_group}`}>
        <div className={styles.label}><div>{label}{required && <span>*</span>}</div></div>
            <FormControl variant="outlined" fullWidth>
                <Select value={arrVal} 
                    onChange={(e: any) => handleChange(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
                    multiple
                    renderValue={(selected) => selected?.join(', ')}
                    error={focused && required && !validateRequiredArr(arrVal) ? true : false}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setBlur(true)}
                >
                    {data && data.map((item: string, index: number) => <MenuItem key={index} value={item}>
                        <FormControlLabel checked={arrVal?.includes(item)} control={<Checkbox />} label={item} />
                    </MenuItem>)}
                </Select>
            {required && !validateRequiredArr(arrVal) && blur && <span className={styles.err_mess}>{label + ": 入力必須です"}</span>}
            </FormControl> 
    </div>
}

export interface DropdownProps {
    label: string;
    data: any;
    value?: string;
    handleChange: any;
    required?: boolean;
    filter?: boolean;
    arrVal?: Array<string>
}

export default MultiDropdown;