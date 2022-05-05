import { NextRouter, useRouter } from "next/dist/client/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../apis/reducers/authReducer";
import { getFilterOptions } from "../apis/reducers/filterReducer";
import { RootState } from "../apis/store";
import { User } from "../libs/account-type";
import styles from "./navbar.module.scss";
import YesNoDialog from "./shared/YesNoDialog";

const Navbar = () => {
    // hooks
    const dispatch = useDispatch();

    // states
    const router: NextRouter = useRouter();
    const [currentRoute, setCurrentRoute] = React.useState<number | undefined>(undefined);
    const [logoutDialog, setLogoutDialog] = React.useState<boolean>(false);
    const [user, setUser] = React.useState<User | null>(null)

    const handleLogout = (value: string) => {
        if (value === 'yes') {
            dispatch(logout());
            setLogoutDialog(false);
            router.push("/login");
        } else {
            setLogoutDialog(false);
        }
    }

    const gotoPage = (page: number) => {
        if (page == currentRoute) return;
        if (page == 1) {
            router.push('/companies');
        } else {
            router.push('/management');
        }
    }

    React.useEffect(() => {
        const path = router.pathname;
        if (path.startsWith("/companies")) {
            setCurrentRoute(1);
        } else if (path === "/management") {
            setCurrentRoute(2);
        }
        if (router.query.companyId !== undefined) {
            localStorage.setItem('prevCompanyId', router.query.companyId.toString())
        }
    },[router.pathname])

    React.useEffect(() => {
        if (localStorage && localStorage.getItem('user')) {
            const thisUser = localStorage.getItem('user');
            if (thisUser) {
                setUser(JSON.parse(thisUser));
                dispatch(getFilterOptions())
            }
        }
    },[])

    return user && <div className={styles.navbar_container}>
        <div className={styles.navbar_menu}>
            <div className={styles.navbar_menu_item_logo}>
                <div><img alt="" src="/logo.png" /></div>
                <div>react-redux-thunk</div>
            </div>
            <div className={styles.navbar_menu_item}>
                <div 
                    className={currentRoute == 1 ? `${styles.selected}` : ''}
                    onClick={() => { currentRoute !== 1 ? setCurrentRoute(1) : ''; gotoPage(1) }}
                >企業一覧</div>
                <div 
                    className={currentRoute == 2 ? `${styles.selected}` : ''}
                    onClick={() => { currentRoute !== 2 ? setCurrentRoute(2) : ''; gotoPage(2) }}
                >記入者管理</div>
            </div>
        </div>
        <div className={styles.user}>
            <div>
                <div className={styles.user_ava}><img alt="" src="/default_ava.png" /></div>
                <span>{ user?.accountName }</span>
                <img alt="" src="/logout.png" onClick={() => setLogoutDialog(true)}/>
            </div>
        </div>
        <YesNoDialog onAccept={handleLogout} onClose={() => setLogoutDialog(false)} open={logoutDialog} title="ログアウトしますか？"/>
    </div>
}

export default Navbar;