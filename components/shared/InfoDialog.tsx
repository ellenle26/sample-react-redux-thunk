import {Dialog} from "@mui/material";
import React from "react";
import styles from "./infoDialog.module.scss";
import CloseIcon from '@mui/icons-material/Close';
import {JobInfo} from "../../libs/jobInfo-type";

const InfoDialog = (props: InfoDialogProps) => {
    const {title, open, onClose, data} = props;

    return <Dialog open={open} onClose={() => onClose(false)} fullWidth maxWidth="lg">
        <div className={styles.title}>
            <span>{title}</span>
            <CloseIcon className={styles.close_icon} onClick={() => onClose(false)}/>
        </div>
        <div className={styles.info}>
            <div className={styles.info_grid}>
                <div className={styles.info_title}>ID</div>
                <div>{data?.jobInfoId}</div>
                <div className={styles.info_title}>情報取得日</div>
                <div>{data?.crawlDateTime}</div>
                <div className={styles.info_title}>媒体名</div>
                <div>{data?.mediaName}</div>
                <div className={styles.info_title}>求人タイトル</div>
                <span>{data?.jobTitle}</span>
                <div className={styles.info_title}>職種中分類</div>
                <span>{data?.midJobCategory}</span>
                <div className={styles.info_title}>エリア大分類</div>
                <span>{data?.bigAreaCategory}</span>
                <div className={styles.info_title}>エリア中分類</div>
                <span>{data?.midAreaCategory}</span>
                <div className={styles.info_title}>掲載開始日</div>
                <span>{data?.publishStartDate}</span>
                <div className={styles.info_title}>掲載終了日</div>
                <span>{data?.publishEndDate}</span>
            </div>

            {data?.details ? Object.keys(data.details).map((key, index) => (
                <div key={index} className={styles.other_grid}>
                    <div className={styles.info_title}>{key}</div>
                    <div>{data.details[key]}</div>
                </div>
            )) : <></>}
        </div>

    </Dialog>
}

export interface InfoDialogProps {
    title: string;
    open: boolean;
    onClose: any;
    data: JobInfo;
}

export default InfoDialog;