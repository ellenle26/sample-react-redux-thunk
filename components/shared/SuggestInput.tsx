import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { PicOption } from "../../libs/filter-type";
import styles from "./suggestInput.module.scss";

const SuggestInput = (props: SuggestInputPrpops) => {
    const { label, placeholder, handleInputChange, value, required, filter, disable, options } = props;

    return <div className={styles.input_container}>
        <div className={styles.input_label}><div>{label}{required && <span>*</span>}</div></div>
        {options && <Autocomplete
            freeSolo
            clearOnBlur
            options={options.map((option: PicOption) => option.accountName)}
            onChange={(event, value, reason) => reason === 'clear' ? handleInputChange('') : handleInputChange(value)}
            renderInput={(params) => <TextField {...params}
            InputProps={{
                ...params.InputProps,
            }}/>}
        />}
    </div>
}

export interface SuggestInputPrpops {
    label: string;
    placeholder?: string;
    handleInputChange: any;
    value: string;
    required?: boolean;
    filter?: boolean;
    disable?: boolean;
    options: any
}

export default SuggestInput;