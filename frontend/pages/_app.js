import React,{Fragment} from 'react';
import App from 'next/app';
import Head from 'next/head';
import theme from '../theme';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import '../styles.css'

export default class MyApp extends App {
    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <Fragment>
                <Head>
                    <title>My page</title>
                    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                </Head>
                <ThemeProvider theme={theme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeProvider>
            </Fragment>
        );
    }
}