import { Accordion, AccordionSummary } from "@mui/material";
import { NextRouter, useRouter } from "next/dist/client/router";
import React from "react";
import styles from "./index.module.scss";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CommonDialog from "../../../components/CommonDialog";
import YesNoDialog from "../../../components/shared/YesNoDialog";
import InfoDialog from "../../../components/shared/InfoDialog";
import { getCompanyById, updateCompanyInfo } from "../../../apis/company-api";
import { Company } from "../../../libs/company-type";
import { error, success } from "../../../apis/reducers/snackbarsReducer";
import { useDispatch } from "react-redux";
import { CallInfo } from "../../../libs/callInfo-type";
import { createCall, deleteCall, editCall, getCall } from "../../../apis/call-api";
import { CreateCallRequest } from "../../../apis/models/call";
import { CreateCompanyRequest } from "../../../apis/models/company";
import withAuth from "../../../utils/withAuth";
import { JobInfo } from "../../../libs/jobInfo-type";
import { getJobDetails, getJobs } from "../../../apis/job-api";
import Paging from "../../../components/shared/Paging";

const CompanyDetails = () => {
    // hooks
    const router: NextRouter = useRouter();
    const dispatch = useDispatch();

    // states
    const [details, setDetails] = React.useState<Company | null>(null);
    const [jobList, setJobList] = React.useState<Array<JobInfo> | null>([]);
    const [editCompanyDialog, setEditCompanyDialog] = React.useState<boolean>(false);
    const [editCompanyDetails, setEditCompanyDetails] = React.useState<any>(null);
    const [addCallInfoDialog, setAddCallInfoDialog] = React.useState<boolean>(false);
    const [editCallInfoDialog, setEditCallInfoDialog] = React.useState<boolean>(false);
    const [callEditItem, setCallEditItem] = React.useState<CallInfo | null>(null);
    const [deleteCallInfoDialog, setDeleteCallInfoDialog] = React.useState<boolean>(false);
    const [deleteCallItemId, setDeleteCallItemId] = React.useState<number | null>(null);
    const [jobInfoDialog, setJobInfoDialog] = React.useState<boolean>(false);
    const [jobInfoDetails, setJobInfoDetails] = React.useState<any>({});
    const [jobPage, setJobPage] = React.useState<number>(1);
    const [totalJobPage, setTotalJobPage] = React.useState<number>(1);

    // functions
    const addCallInfo = async (value: string, req: CreateCallRequest) => {
        if (value === "yes") {
            let companyId = router.query.companyId;
            if (companyId == undefined) {
                const getIdFromStorage = localStorage.getItem('prevCompanyId');
                if (getIdFromStorage != null) {
                    companyId = getIdFromStorage.toString();
                }
            }
            await createCall(companyId, req)
                .then((res) => {
                    const message = res.data.data.message;
                    dispatch(success(message)); 
                    setAddCallInfoDialog(false);
                })
                .finally(() => { getCompanyDetails()})
        } else {
            setAddCallInfoDialog(false);
        }
    }
    const handleEditCallItem = async (id: any) => {
        let companyId = router.query.companyId;
        if (companyId == undefined) {
            const getIdFromStorage = localStorage.getItem('prevCompanyId');
            if (getIdFromStorage != null) {
                companyId = getIdFromStorage.toString();
            }
        }
        await getCall(companyId, id)
            .then((res) => {
                const data = res.data.data;
                setCallEditItem(data);
            })
            .finally(() => setEditCallInfoDialog(true))
    }

    const editCallInfo = async (value: string, req: CreateCallRequest) => {
        let companyId = router.query.companyId;
        if (companyId == undefined) {
            const getIdFromStorage = localStorage.getItem('prevCompanyId');
            if (getIdFromStorage != null) {
                companyId = getIdFromStorage.toString();
            }
        }
        if (value === "yes") {
            if (value === "yes") {
                setEditCallInfoDialog(false);
                await editCall(companyId, req)
                    .then((res) => {
                        const message = res.data.data.message;
                        dispatch(success(message));
                    })
                    .finally(() => {  getCompanyDetails() })
            } else {
                setEditCallInfoDialog(false);
            }
        } else {
            setEditCallInfoDialog(false);
        }
    }

    const handleEditCompanyInfoItem = () => {
        const editItem = {
            companyId: details?.companyId,
            corporateNumber: details?.corporateNumber,
            industry: details?.industry,
            branchName: details?.branchName,
            companyName: details?.companyName,
            companyStatus: details?.companyStatus.name,
            prefecture: details?.prefecture,
            tel: details?.tel,
            fax: details?.fax,
            city: details?.city,
            addressOther: details?.addressOther,
            accountId: details?.personInCharge,
            callFlag: details?.callFlag ? details.callFlag.name : '',
            lastCallDate: details?.lastCallDateTime ? details?.lastCallDateTime : null,
            scheduledRecallDate: details?.scheduledRecallDateTime ? details?.scheduledRecallDateTime : null
        }
        setEditCompanyDetails(editItem);
        setEditCompanyDialog(true)
    }

    const editCompanyInfo = async (value: string, req: CreateCompanyRequest) => {
        if (value === "yes") {
            setEditCompanyDialog(false);
            await updateCompanyInfo(req)
                .then((res) => {
                    const message = res.data.data.message;
                    dispatch(success(message));
                })
                .finally(() => {
                    getCompanyDetails();
                })
        } else {
            setEditCompanyDialog(false);
        }
    }

    const deleteCallInfo = async (value: string) => {
        if (value === "yes") {
            setDeleteCallInfoDialog(false);
            let companyId = router.query.companyId;
            if (companyId == undefined) {
                const getIdFromStorage = localStorage.getItem('prevCompanyId');
                if (getIdFromStorage != null) {
                    companyId = getIdFromStorage.toString();
                }
            }
            await deleteCall(companyId, deleteCallItemId)
                .then((res) => {
                    dispatch(success('削除しました。'));
                })
                .finally(() => {  getCompanyDetails()})
        } else {
            setDeleteCallItemId(null);
            setDeleteCallInfoDialog(false);
        }
    }

    const getCompanyDetails = async () => {
        let companyId = router.query.companyId;
        if (companyId == undefined) {
            const getIdFromStorage = localStorage.getItem('prevCompanyId');
            if (getIdFromStorage != null) {
                companyId = getIdFromStorage.toString();
            }
        }
        await getCompanyById(companyId)
            .then((res) => {
                const data = res.data.data;
                setDetails(data);
            })
            .catch((err) => {
                dispatch(error('データがありません！'));
                router.push('/companies');
            })
    }

    const getJobList = async () => {
        let companyId = router.query.companyId;
        if (companyId == undefined) {
            const getIdFromStorage = localStorage.getItem('prevCompanyId');
            if (getIdFromStorage != null) {
                companyId = getIdFromStorage.toString();
            }
        }
        await getJobs(jobPage, companyId)
            .then((res) => {
                const data = res.data.data;
                setJobList(data.jobInfos);
                setTotalJobPage(data.totalPages);
            })
    }

    const showJobInfo = async (jobInfoId: number) => {
        let companyId = router.query.companyId;
        if (companyId == undefined) {
            const getIdFromStorage = localStorage.getItem('prevCompanyId');
            if (getIdFromStorage != null) {
                companyId = getIdFromStorage.toString();
            }
        }
        await getJobDetails(companyId, jobInfoId)
            .then((res) => {
                const data = res.data.data;
                setJobInfoDetails(data);
            })
            .finally(() => setJobInfoDialog(true))
    }

    // useEffect
    React.useEffect(() => {
        getCompanyDetails();
    }, [])

    React.useEffect(() => {
        getJobList();
    }, [jobPage])


    return<>
        <div className={styles.page_container}>
            <div className={styles.page_title}>
                <img alt="" src="/back.png" className={styles.icon} onClick={() => router.push('/companies')} />
                <span>{details?.companyName}</span>
            </div>
            <div className={styles.company_info}>
                <Accordion defaultExpanded={true}>
                    <AccordionSummary expandIcon={<div className={styles.expand_icon}></div>}>
                        <div className={styles.company_info_title}>企業情報</div>
                    </AccordionSummary>
                    <div className={styles.info_grid}>
                        <div className={styles.info_title}>法人番号</div>
                        <div>{details?.corporateNumber}</div>
                        <div className={styles.info_title}>業種</div>
                        <div>{details?.industry}</div>
                        <div className={styles.edit_icon}><img alt="" src="/edit.svg" onClick={() => handleEditCompanyInfoItem()} /></div>
                        <div className={styles.info_title}>企業名</div>
                        <div>{details?.companyName}</div>
                        <div className={styles.info_title}>電話番号</div>
                        <div>{details?.tel}</div>
                        <div></div>
                        <div className={styles.info_title}>支店名</div>
                        <div>{details?.branchName}</div>
                        <div className={styles.info_title}>FAX番号</div>
                        <div>{details?.fax}</div>
                        <div></div>
                        <div className={styles.info_title}>ステータス</div>
                        <div>{details?.companyStatus?.name}</div>
                        <div className={styles.info_title}>架電フラグ</div>
                        <div>{details?.callFlag?.name}</div>
                        <div></div>
                        <div className={styles.info_title}>都道府県</div>
                        <div>{details?.prefecture}</div>
                        <div className={styles.info_title}>最終架電日</div>
                        <div>{details?.lastCallDateTime}</div>
                        <div></div>
                        <div className={styles.info_title}>市区町村</div>
                        <div>{details?.city}</div>
                        <div className={styles.info_title}>再架電予定日</div>
                        <div>{details?.scheduledRecallDateTime}</div>
                        <div></div>
                        <div className={styles.info_title}>番地など</div>
                        <div>{details?.addressOther}</div>
                        <div className={styles.info_title}>記入者</div>
                        <div>{details?.personInCharge}</div>
                    </div>
                </Accordion>
            </div>
            {/* call info */}
            <div className={styles.call_info}>
                <Accordion>
                    <AccordionSummary expandIcon={<div className={styles.expand_icon}></div>}>
                        <div className={styles.call_info_title}>
                            <span>架電情報</span>
                            <AddCircleIcon className={styles.add_icon} onClick={() => setAddCallInfoDialog(true)}/>
                        </div>
                    </AccordionSummary>
                    <div className={styles.call_info_table}>
                        <div className={styles.head_row}>
                            <div>架電日時</div>
                            <div>ステータス</div>
                            <div>確度（反応）</div>
                            <div>先方応対者</div>
                            <div>記入者</div>
                            <div>きっかけ</div>
                            <div>再架電予定日</div>
                            <div>メモ</div>
                            <div></div>
                        </div>
                        {details?.callInfo && details.callInfo.length > 0 ?
                            details?.callInfo.map((item, index) => <div className={styles.item_row} key={index}>
                                <div>{item.callDateTime}</div>
                                <div>{item.callInfoStatus?.name}</div>
                                <div>{item.responseAccuracy?.name}</div>
                                <div>{item.responder}</div>
                                <div>{item.writer}</div>
                                <div>{item.motive?.name}</div>
                                <div>{item.scheduledRecallDateTime}</div>
                                <div>{item.memo}</div>
                                <div className={styles.actions}>
                                    <img alt="" src="/edit.svg" onClick={() => handleEditCallItem(item.callInfoId)}/>
                                    <img alt="" src="/delete.png" onClick={() => {setDeleteCallItemId(item.callInfoId); setDeleteCallInfoDialog(true)}}/>
                                </div>
                            </div>)
                            : <div className={styles.no_data}>データがありません。</div>
                        }
                    </div>
                </Accordion>
            </div>
            {/* job info */}
            <div className={styles.job_info}>
                <Accordion>
                    <AccordionSummary expandIcon={<div className={styles.expand_icon}></div>}>
                        <div className={styles.job_info_title}>求人情報</div>
                    </AccordionSummary>
                    <div className={styles.job_info_table}>
                        <div className={styles.head_row}>
                            <div>情報取得日</div>
                            <div>媒体名</div>
                            <div>ページタイトル</div>
                            <div>職種中分類</div>
                            <div>エリア大分類</div>
                            <div>エリア中分類</div>
                            <div>掲載開始日</div>
                            <div>掲載終了日</div>
                        </div>
                        {jobList && jobList.length > 0 ?
                            jobList?.map((item, index) => <div className={`${styles.item_row} ${styles.onhover}`} key={index} onClick={() => showJobInfo(item.jobInfoId)}>
                                <div>{item.crawlDateTime}</div>
                                <div>{item.mediaName}</div>
                                <div>{item.jobTitle}</div>
                                <div>{item.midJobCategory}</div>
                                <div>{item.midAreaCategory}</div>
                                <div>{item.bigAreaCategory}</div>
                                <div>{item.publishStartDate}</div>
                                <div>{item.publishEndDate}</div>
                            </div>)
                            : <div className={styles.no_data}>データがありません。</div>
                        }
                        {
                            jobList && jobList.length > 0 ?
                                <div className={styles.bottom_row}>
                                    <Paging currentPage={jobPage} totalPage={totalJobPage} handlePageChange={setJobPage} />
                                </div> : <></>
                        }
                    </div>
                </Accordion>
            </div>
            <CommonDialog
                action="edit"
                onAccept={editCompanyInfo}
                onClose={setEditCompanyDialog}
                open={editCompanyDialog}
                title="企業情報編集"
                dialogType="company"
                editData={editCompanyDetails}
            />
            <CommonDialog
                action="add"
                onAccept={addCallInfo}
                onClose={setAddCallInfoDialog}
                open={addCallInfoDialog}
                title="架電情報新規作成"
                dialogType="call"
            />
            <CommonDialog
                action="edit"
                onAccept={editCallInfo}
                onClose={setEditCallInfoDialog}
                open={editCallInfoDialog}
                title="架電情報編集"
                dialogType="call"
                editData={callEditItem}
            />
            <YesNoDialog
                title="削除しますか？"
                open={deleteCallInfoDialog}
                onClose={setDeleteCallInfoDialog}
                onAccept={deleteCallInfo}
            />
            <InfoDialog title="求人情報閲覧" open={jobInfoDialog} onClose={setJobInfoDialog} data = {jobInfoDetails}/>
        </div>
    </>
}

export default withAuth(CompanyDetails);