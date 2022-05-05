import React from "react";
import styles from "./management.module.scss";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Account } from "../libs/account-type";
import Paging from "../components/shared/Paging";
import YesNoDialog from "../components/shared/YesNoDialog";
import CommonDialog from "../components/CommonDialog";
import { AccountsResponseData, CreateAccRequest, UpdateAccRequest } from "../apis/models/account";
import { createAccount, deleteAccountById, editAccountById, getAccountById, getAllAccounts } from "../apis/account-api";
import { useDispatch, useSelector } from "react-redux";
import { error, success } from "../apis/reducers/snackbarsReducer";
import { RootState } from "../apis/store";
import withAuth from "../utils/withAuth";
import { dateToString } from "../utils/formatDate";

const Management = () => {
    // hooks
    const dispatch = useDispatch();

    // states
    const [currentUser, setCurrentUser] = React.useState<any>(null);
    const [data, setData] = React.useState<any>([]);
    const [page, setPage] = React.useState<number>(1);
    const [totalPage, setTotalPage] = React.useState<number>(2);
    const [deleteUserDialog, setDeleteUserDialog] = React.useState<boolean>(false);
    const [deleteItem, setDeleteItem] = React.useState<number | null>(null);
    const [addUserDialog, setAddUserDialog] = React.useState<boolean>(false);
    const [editUserDialog, setEditUserDialog] = React.useState<boolean>(false);
    const [editItem, setEditItem] = React.useState<any>(null);

    // functions
    const deleteUser = async (value: string) => {
        if (value === "yes") {
            if (currentUser.id == deleteItem) {
                dispatch(error('使用中アカウントの削除できません！'));
                setDeleteUserDialog(false);
            } else {
                await deleteAccountById(deleteItem)
                    .then((res) => {
                        dispatch(success("削除しました。"));
                    })
                    .catch((err) => dispatch(error(err.message)))
                    .finally(() => {
                        getAccountList();
                        setDeleteUserDialog(false);});
                    }
        } else {
            setDeleteItem(null);
            setDeleteUserDialog(false);
        }
    }

    const addUser = async (value: string, req: CreateAccRequest | null) => {
        if (value === "yes" && req) {
            setAddUserDialog(false);
            await createAccount(req)
                .then((res) => {
                    const message = res.data.data.message;
                    dispatch(success(message));
                })
                .catch((err) => dispatch(error(err.message)))
                .finally(() => { getAccountList();})
        } else {
            setAddUserDialog(false);
        }
    }

    const handleEditItem = async (id: any) => {
        setEditUserDialog(true);
        await getAccountById(id)
            .then((res) => {
                const accountData = res.data.data;
                setEditItem(accountData);
            })
            .finally(() => {
            })
    }

    const editUser = async (value: string, req: UpdateAccRequest) => {
        if (value === "yes") {
            await editAccountById(req)
                .then((res) => {
                    const message = res.data.data.message;
                    dispatch(success(message));
                })
                .catch((err) => dispatch(error(err.message)))
                .finally(() => { getAccountList(); setEditUserDialog(false); })
        } else {
            setEditUserDialog(false);
        }
    }

    const getAccountList = async () => {
        await getAllAccounts(page).then((res) => {
            const responseData: AccountsResponseData = res.data.data;
            setData(responseData.accounts);
            setTotalPage(responseData.totalPages);
        })
    }

    // useEffect
    React.useEffect(() => {
        const user = localStorage?.getItem('user');
        if (user) setCurrentUser(JSON.parse(user));
    },[])

    React.useEffect(() => {
        getAccountList();
    }, [page])



    return <>
        <div className={styles.page_container}>
            <div className={styles.page_title}>
                <span>記入者管理</span>
                <AddCircleIcon className={styles.icon} onClick={() => setAddUserDialog(true)}/>
            </div>
            <div className={styles.table_grid}>
                <div className={styles.head_row}>
                    <div>記入者名</div>
                    <div>エリア</div>
                    <div>ログインメールアドレス</div>
                    <div>ステータス</div>
                    <div>最終ログイン日時</div>
                    <div></div>
                </div>
                {
                    data && data.length > 0 ?
                        data.map((item: Account, index: number) => <div className={styles.table_row} key={index}>
                            <div>{item?.accountName}</div>
                            <div>{item && item.areas ? item?.areas.map((item, index) => <span key={index}>{item}</span>) : <></>}</div>
                            <div>{item?.email}</div>
                            <div><div className={item?.accountStatus === '無効' ? `${styles.tag_gray}` : `${styles.tag_yellow}`}>{item?.accountStatus}</div></div>
                            <div>{item?.lastLoginDateTime ? item?.lastLoginDateTime : ''}</div>
                            <div className={styles.actions}>
                                <img alt="" src="/edit.svg" onClick={() => handleEditItem(item.accountId)} />
                                <img alt="" src="/delete.png" onClick={() => {setDeleteUserDialog(true); setDeleteItem(item.accountId)}} />
                            </div>
                        </div>) 
                    : <></>
                }
                <div className={styles.bottom_row}>
                    <Paging currentPage={page} totalPage={totalPage} handlePageChange={setPage} />
                </div>
            </div>
            <YesNoDialog title="削除しますか？" open={deleteUserDialog} onClose={setDeleteUserDialog} onAccept={deleteUser}/>
            <CommonDialog 
                title="記入者新規作成"
                dialogType="user" 
                open={addUserDialog}
                onClose={setAddUserDialog}
                action="add"
                onAccept={addUser}
            />
            <CommonDialog
                title="記入者編集"
                dialogType="user"
                open={editUserDialog}
                onClose={setEditUserDialog}
                action="edit"
                onAccept={editUser}
                editData={editItem}
            />
        </div>
    </>
}

export default withAuth(Management);