import { NextRouter, useRouter } from "next/dist/client/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { warning } from "../apis/reducers/snackbarsReducer";
import { RootState } from "../apis/store";

export default function withAuth(WrappedComponent: any) {

    return () => {
        const router: NextRouter = useRouter();
        const [isAuthorized, setIsAuthorized] = React.useState<boolean>(false);
        const user = useSelector((state: RootState) => state.auth.account);
        const dispatch = useDispatch();

        React.useEffect(() => {
            let account = localStorage?.getItem("user");
            try {
                if (account === null) {
                    setIsAuthorized(false);
                    router.push("/login");
                } else {
                    setIsAuthorized(true);
                }
            } catch (err) {
                router.push("/login");
            }
        },[user])

        return isAuthorized && <WrappedComponent/>
    }
}