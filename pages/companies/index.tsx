import React from "react";
import withAuth from "../../utils/withAuth";
import styles from "./index.module.scss";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Dropdown from "../../components/shared/Dropdown";
import DateSelect from "../../components/shared/DateSelect";
import { Button } from "@mui/material";
import Paging from "../../components/shared/Paging";
import { NextRouter, useRouter } from "next/dist/client/router";
import { createCompany, downloadCompaniesData, getAllCompanies } from "../../apis/company-api";
import { CompanyListItem } from "../../libs/company-type";
import { CompaniesResponseData, CompanyQueries, CreateCompanyRequest } from "../../apis/models/company";
import InputGroup from "../../components/shared/InputGroup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../apis/store";
import { error, success } from "../../apis/reducers/snackbarsReducer";
import { keyOfSelect, keyOfSelectPic } from "../../utils/formatForDisplay";
import { milisecToStringDate, numberToDate } from "../../utils/formatDate";
import { savePrefecture, saveCallFlag, saveCompanyStatus, saveIndustry, saveLastCallDate, savePage, savePersonInCharge, saveScheduledRecallDate, saveCompanyName, saveBranchName } from "../../apis/reducers/filterReducer";
import { format } from "date-fns";
import SuggestInput from "../../components/shared/SuggestInput";
import CommonDialog from "../../components/CommonDialog";

const Companies = () => {
    // hooks
    const router: NextRouter = useRouter();
    const filterOptions = useSelector((state: RootState) => state.filter.filterOptions);
    const queryFilters = useSelector((state: RootState) => state.filter.queryFilters);
    const page = useSelector((state: RootState) => state.filter.page);
    const dispatch = useDispatch();

    // states
    const [tableData, setTableData] = React.useState<Array<CompanyListItem> | []>([]);
    const [totalPage, setTotalPage] = React.useState<number>(1);
    const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false);
    const [companyDialog, setCompanyDialog] = React.useState<boolean>(false);

    // functions
    const addCompany = async (value: string, req: CreateCompanyRequest) => {
        if (value === 'yes') {
            setCompanyDialog(false);
            await createCompany(req)
                .then((res) => {
                    const message = res.data.data.message;
                    dispatch(success(message));
                })
                .catch((err) => {
                    const message = err.message;
                    dispatch(error(message));
                })
                .finally(() => {
                    getCompanyList(1);
                })
        } else {
            setCompanyDialog(false);
        }
    }

    // const deleteCompany = (value: string) => {
    //     if (value === "yes") {
    //         console.log("delete");
    //         setDeleteDialog(false);
    //     } else {
    //         setDeleteDialog(false);
    //     }
    // }

    const downloadExcel = async () => {
        dispatch(success("Excel ?????????????????????????????????????????????"))
        const req: CompanyQueries = {
            companyStatus: keyOfSelect(queryFilters.companyStatus, filterOptions?.companyStatus),
            prefecture: queryFilters.prefecture,
            // industry: queryFilters.industry,
            branchName: queryFilters.branchName,
            companyName: queryFilters.companyName,
            accountId: keyOfSelectPic(queryFilters.personInCharge, filterOptions?.personInCharges),
            callFlag: keyOfSelect(queryFilters.callFlag, filterOptions?.callFlags),
            // lastCallDate: queryFilters.lastCallDate ? milisecToStringDate(queryFilters.lastCallDate) : null,
            scheduledRecallDate: queryFilters.scheduledRecallDate ? milisecToStringDate(queryFilters.scheduledRecallDate) : null,
        }

        await downloadCompaniesData(req)
            .then((res) => {
                const blob = new Blob([res.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                let time = format(new Date(), 'yyyyMMddHHmm');
                const fileName = `????????????_${time}.xlsx`
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = fileName;
                link.click();
                window.URL.revokeObjectURL(link.href);
            })
    }

    const getCompanyList = async (page: number) => {
        const req: CompanyQueries = {
            companyStatus: keyOfSelect(queryFilters.companyStatus, filterOptions?.companyStatus),
            prefecture: queryFilters.prefecture,
            // industry: queryFilters.industry,
            branchName: queryFilters.branchName,
            companyName: queryFilters.companyName,
            accountId: keyOfSelectPic(queryFilters.personInCharge, filterOptions?.personInCharges),
            callFlag: keyOfSelect(queryFilters.callFlag, filterOptions?.callFlags),
            // lastCallDate: milisecToStringDate(queryFilters.lastCallDate),
            scheduledRecallDate: milisecToStringDate(queryFilters.scheduledRecallDate),
        }
        await getAllCompanies(page, req)
            .then((res) => {
                const companiesData: CompaniesResponseData = res.data.data;
                setTableData(companiesData.companies);
                setTotalPage(companiesData.totalPages);
            })
            .catch((err) => setTableData([]))
    }

    const savePrefectureOption = (value: any) => {
        dispatch(savePrefecture(value));
    }
    const saveCompanyStatusOption = (value: any) => {
        dispatch(saveCompanyStatus(value));
    }
    const saveCallFlagOption = (value: any) => {
        dispatch(saveCallFlag(value));
    }
    // const saveIndustryOption = (value: any) => {
    //     dispatch(saveIndustry(value));
    // }
    const saveBranchNameOption = (value: any) => {
        dispatch(saveBranchName(value));
    }
    // const saveLastCallDateOption = (value: any) => {
    //     dispatch(saveLastCallDate(new Date(value).getTime()));
    // }
    const saveCompanyNameOption = (value: any) => {
        dispatch(saveCompanyName(value));
    }
    const savePersonInChargeOption = (value: any) => {
        dispatch(savePersonInCharge(value));
    }
    const saveScheduleRecallDateOption = (value: any) => {
        dispatch(saveScheduledRecallDate(new Date(value).getTime()));
    }
    const savePageOption = (value: any) => {
        dispatch(savePage(value))
    }

    // useEffect
    React.useEffect(() => {
        getCompanyList(page)
    }, [page])


    return<>
        <div className={styles.page_container}>
            <div className={styles.page_title}>
                <span>????????????</span>
                <AddCircleIcon className={styles.icon} onClick={() => setCompanyDialog(true)}/>
            </div>
            <div className={styles.filter_options}>
                <Dropdown filter label="???????????????" from="companyStatus" data={filterOptions?.companyStatus} handleChange={saveCompanyStatusOption} value={queryFilters.companyStatus} />
                <InputGroup filter label="????????????" type="input" handleInputChange={savePrefectureOption} value={queryFilters.prefecture} />
                {/* <InputGroup filter label="??????" type="input" handleInputChange={saveIndustryOption} value={queryFilters.industry} /> */}
                <Dropdown filter label="???????????????" data={filterOptions?.callFlags} handleChange={saveCallFlagOption} value={queryFilters.callFlag} />
                <SuggestInput filter label="?????????" options={filterOptions?.personInCharges} handleInputChange={savePersonInChargeOption} value={queryFilters.personInCharge} />
                <InputGroup filter label="?????????" type="input" handleInputChange={saveCompanyNameOption} value={queryFilters.companyName} />
                <InputGroup filter label="?????????" type="input" handleInputChange={saveBranchNameOption} value={queryFilters.branchName} />
                {/* <DateSelect filter label="???????????????" selectedDate={queryFilters.lastCallDate ? numberToDate(queryFilters.lastCallDate) : null} handleDateChange={saveLastCallDateOption} /> */}
                <DateSelect filter label="??????????????????" selectedDate={queryFilters.scheduledRecallDate ? numberToDate(queryFilters.scheduledRecallDate) : null} handleDateChange={saveScheduleRecallDateOption} />
                <Button
                    variant="contained"
                    color="primary"
                    className={styles.button}
                    onClick={() => {
                        getCompanyList(1);
                        savePageOption(1);}
                    }
                >??????</Button>
            </div>  {totalPage < 500 ?
            <div className={styles.download}>
                <img alt="" src="/download.png"/>
               <span onClick={() => downloadExcel()}>????????????Excel?????????????????????</span>
            </div> :  <div className={styles.download}></div>}
            <div className={styles.table_grid}>
                {/* head row */}
                <div className={styles.head_row}>
                    <div>?????????</div>
                    <div>?????????</div>
                    <div>???????????????</div>
                    <div>?????????</div>
                    <div>????????????</div>
                    <div>???????????????</div>
                    <div>???????????????</div>
                    <div>??????????????????</div>
                </div>
                {/* item row */}
                { tableData && tableData.length > 0 ?
                    tableData.map((item: CompanyListItem, index: number) => <div key={index} className={styles.item_row}
                    onClick={() => router.push(`/companies/detail?companyId=${item.companyId}`)}>
                    <div>{item?.companyName}</div>
                    <div>{item?.branchName}</div>
                    <div><div className={item?.companyStatus === '??????' ? `${styles.tag_green}` : item?.companyStatus === '??????' ? `${styles.tag_blue}` : item?.companyStatus === '?????????' ? `${styles.tag_yellow}` : `${styles.tag_gray}` }>{item?.companyStatus}</div></div>
                    <div>{item?.address}</div>
                    <div>{item?.tel}</div>
                    <div>{item?.callFlag ? <div className={item?.callFlag === '???' ? `${styles.tag_green}` : `${styles.tag_gray}`}>{item?.callFlag}</div> : <></>}</div>
                    <div>{item?.lastCallDateTime}</div>
                    <div>{item?.scheduledRecallDateTime}</div>
                </div>) : <div className={styles.no_data}>??????????????????????????????</div>
                }
                {/* bottom row */}
                {
                tableData && tableData.length > 0 ?
                    <div className={styles.bottom_row}>
                        <Paging currentPage={page} totalPage={totalPage} handlePageChange={savePageOption} />
                    </div> : <></>
                }
            </div>
            {/* <YesNoDialog onAccept={deleteCompany} onClose={() => setDeleteDialog(false)} open={deleteDialog} title="?????????????????????"/> */}
            <CommonDialog
                action="add"
                open={companyDialog}
                onClose={setCompanyDialog}
                onAccept={addCompany}
                title="??????????????????"
                dialogType="company"
            />
        </div>
    </>;
}

export default withAuth(Companies);