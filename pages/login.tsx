import { Button } from "@mui/material";
import { NextRouter, useRouter } from "next/dist/client/router";
import React from "react";
import { useDispatch } from "react-redux";
import { LoginRequest } from "../apis/models/account";
import { login } from "../apis/reducers/authReducer";
import { getFilterOptions } from "../apis/reducers/filterReducer";
import { error } from "../apis/reducers/snackbarsReducer";
import { validateEmail, validatePassword } from "../utils/validateInput";
import styles from './login.module.scss';



const Login = () => {
    const router: NextRouter = useRouter();
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [emailErr, setEmailErr] = React.useState<boolean>(false);
    const [passwordErr, setpasswordErr] = React.useState<boolean>(false);
    const [disableLogin, setDisableLogin] = React.useState<boolean>(false);

    const dispatch:any = useDispatch();

    const handleLogin = async () => {
        if (!emailErr && !passwordErr) {
            setDisableLogin(true);
            const req: LoginRequest = {
                email: email,
                password: password,
            }
            try {
                await dispatch(login(req)).unwrap()
                    .then(() => dispatch(getFilterOptions()))
                    .finally(() => {
                        router.push("/companies");
                    });
            } catch (err: any) {
                const message = err.message;
                dispatch(error(message));
                setDisableLogin(false);
            }
        }
    }

    React.useEffect(() => {
        validateEmail(email) ? setEmailErr(false) : '';
        validatePassword(password) ? setpasswordErr(false) : '';
    },[email, password])

    return<div className={styles.login_container}>
        <div>
            <div><img alt="" src="/logo.png" /></div>
            <div className={styles.project_name}>react-redux-thunk</div>
            <div className={styles.title}>ログイン</div>
            <form>
                <div className={styles.custom_input}>
                    <div className={styles.label}>メールアドレス</div>
                    <input
                        type="text"
                        value={email}
                        placeholder="abc@mail.com"
                        className={emailErr ? `${styles.input_error}` : ''}
                        onChange={(event) => { setEmail(event.target.value); validateEmail(email) ? setEmailErr(false) : setEmailErr(true) }}
                        onKeyUp={(e) => e.key === "Enter" ? handleLogin() : ''}
                    />
                    {emailErr ? <div className={styles.helper_text}>メールアドレスを正しく入力してください。</div> : <></>}
                </div>
                <div className={styles.custom_input}>
                    <div className={styles.label}>パスワード</div>
                    <input
                        type="password"
                        value={password}
                        placeholder="********"
                        className={passwordErr ? `${styles.input_error}` : ''}
                        onChange={(event) => { setPassword(event.target.value); validatePassword(password) ? setpasswordErr(false) : setpasswordErr(true)}}
                        onKeyUp={(e) => e.key === "Enter" ? handleLogin() : ''}
                    />
                    {passwordErr ? <div className={styles.helper_text}>半角英字の大文字・小文字、半角数字、記号は各1文字ずつの設定が必須です。</div> : <></>}
                </div>
                <Button 
                    type="button" 
                    variant="outlined" 
                    color="primary"
                    className={styles.button}
                    disabled={disableLogin}
                    onClick={() => {handleLogin()}}
                >
                    ログイン
                </Button>
            </form>
        </div>
    </div>;
}

export default Login;