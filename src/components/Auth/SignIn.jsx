import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Checkbox, TextField,} from 'formik-material-ui';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Field, Form, Formik} from 'formik';
import LinearProgress from "@material-ui/core/LinearProgress";
import {FirebaseContext} from "../../firebase";
import Box from "@material-ui/core/Box";
import {Redirect} from "react-router-dom";

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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {
    const classes = useStyles();
    const [firebaseError, setFirebaseError] = React.useState(null);

    const {user, firebase} = React.useContext(FirebaseContext);

    if (user) {
        return <Redirect from="/signin" to="/"/>
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        rememberMe: false
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
                        const {email, password, rememberMe} = values;
                        // setTimeout(() => {
                        //     setSubmitting(false);
                        //     alert(JSON.stringify(values, null, 2));
                        // }, 500);

                        firebase.signInWithEmailAndPassword(email, password, rememberMe).catch((error) => {
                            console.log(error.code);
                            console.log(error.message);
                            setSubmitting(false);
                            setFirebaseError(error.message);
                        });

                    }}
                >
                    {({submitForm, isSubmitting, errors}) => (
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
                                autoFocus
                            />
                            <Field
                                component={TextField}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />

                            <FormControlLabel
                                control={<Field component={Checkbox} type="checkbox" color="primary"
                                                name="rememberMe"/>}
                                label="Remember me"
                            />
                            {isSubmitting && <LinearProgress/>}
                            {firebaseError && <Typography color="error">{firebaseError}</Typography>}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="/recovery" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </div>
        </Container>
    );
}