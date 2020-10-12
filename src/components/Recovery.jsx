import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
// import {TextField,} from 'formik-material-ui';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import {
    Autocomplete,
    ToggleButtonGroup,
    AutocompleteRenderInputParams,
} from 'formik-material-ui-lab';
import MuiTextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Field, Form, Formik} from 'formik';
import LinearProgress from "@material-ui/core/LinearProgress";
import * as db from "../firestore";
import Box from "@material-ui/core/Box";
import {TextField} from "formik-material-ui";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                PhysLab
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

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
        marginTop: theme.spacing(0),
    },
    gridContainer: {
        marginBottom: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(2, 0, 2),
    },
}));

export default function Recovery() {
    const classes = useStyles();
    const [firebaseError, setFirebaseError] = React.useState(null);
    const [firebaseInfo, setFirebaseInfo] = React.useState(null);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Find your email
                </Typography>
                <Typography align="center" variant="body1">
                    Please enter your Email address below and we send you information to recover your account.
                </Typography>
                <Formik
                    initialValues={{
                        // firstName: '',
                        // lastName: '',
                        email: '',
                        // password: '',
                        // autocomplete: null,
                    }}
                    validate={values => {
                        const errors = {};
                        if (values.email &&
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }
                        return errors;
                    }}
                    onSubmit={(values, {setSubmitting}) => {
                        const {email} = values;
                        // setTimeout(() => {
                        //     setSubmitting(false);
                        //     alert(JSON.stringify(values, null, 2));
                        // }, 500);

                        try {
                            db.resetPassword(email).then(()=>{
                                setSubmitting(false);
                                setFirebaseInfo("Email has been sent to you. Please check and verify.");
                            })
                        } catch(error) {
                                console.log(error.code);
                                console.log(error.message);
                                setSubmitting(false);
                                setFirebaseError(error.message);
                        }
                    }}
                >
                    {({submitForm, isSubmitting, touched, errors}) => (
                        <Form className={classes.form}>
                                    <Field
                                        component={TextField}
                                        name="email"
                                        label="Email Address"
                                        type="email"
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        autoComplete="email"
                                    />
                            {isSubmitting && <LinearProgress/>}
                            {firebaseError && <Typography color="error">{firebaseError}</Typography>}
                            {firebaseInfo && <Typography color="secondary">{firebaseInfo}</Typography>}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                className={classes.submit}
                            >
                                Reset Password
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
            <Box mt={5}>
                <Copyright/>
            </Box>
        </Container>
    );
}