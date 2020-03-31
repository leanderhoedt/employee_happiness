import Link from 'next/link.js';
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import {Formik} from "formik";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";
import TokenService from "../services/Token.service";
import Copyright from "../components/Copyright";
import Router from 'next/router'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignIn = () => {
    const classes = useStyles();
    const onLoginClick = async (credentials) => {
        console.log("Login called");
        const response = await axios.get('/api/auth', credentials);
        const token = response.data.token;
        const tokenService = new TokenService();
        await tokenService.saveToken(token);
        Router.push("/")
    };
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Log in
                </Typography>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    onSubmit={onLoginClick}>
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                          /* and other goodies */
                      }) => (
                        <form onSubmit={handleSubmit} className={classes.form}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Log in
                            </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link href="/signup" variant="body2">
                                        Don't have an account? Sign up
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Formik>
            </div>
            <Box mt={5}>
                <Copyright/>
            </Box>
        </Container>
    )
};

export default SignIn;