import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";
import {store} from "../apis/store";
import { Provider, useDispatch } from 'react-redux';
import SnackbarMessage from '../components/shared/Snackbar';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDateFns';
import jaLocale from 'date-fns/locale/ja';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {

  return <LocalizationProvider dateAdapter={DateAdapter} locale={jaLocale}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarMessage />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  </LocalizationProvider>
}
export default MyApp
