import React from "react";
import { NextRouter, useRouter } from "next/dist/client/router";
import styles from "./layout.module.scss";
import Navbar from "./Navbar";
import { User } from "../libs/account-type";
import { LinearProgress } from "@mui/material";

const Layout = (props: Props) => {
    const router: NextRouter = useRouter();
    const [user, setUser] = React.useState<User | null>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const handleRouteChange = () => {
        setLoading(true);
    }
    const handleRouteChangeDone = () => {
        setLoading(false);
    }

    React.useEffect(() => {
        router.events.on('routeChangeStart', handleRouteChange);
        router.events.on('routeChangeComplete', handleRouteChangeDone);

        return () => {
            router.events.off('routeChangeStart', () => handleRouteChange);
            router.events.off('routeChangeComplete', handleRouteChangeDone);
        }
    }, [])

    React.useEffect(() => {
        if (localStorage && localStorage.getItem('user')) {
            const thisUser = localStorage.getItem('user');
            if (thisUser) {
                setUser(JSON.parse(thisUser));
            }
        } else {
            router.push("login");
        }
    }, [])

    return<>
        { router.pathname === "/login" ? 
            <div className={styles.layout_container_login}>
                {props.children}
            </div> : 
            <div className={styles.layout_container}>
                <div className={styles.navbar_section}>
                    <Navbar />
                </div>
                <div className={styles.content_section}>
                    {loading ? <div><LinearProgress /></div> : <></>}
                    {props.children}
                </div>
            </div> 
        }
    </>;
}

type Props = {
    children: any;
}

export default Layout;