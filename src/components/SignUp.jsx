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

const options = [
    {title: 'The Shawshank Redemption', year: 1994},
    {title: 'The Godfather', year: 1972},
    {title: 'The Godfather: Part II', year: 1974},
    {title: 'The Dark Knight', year: 2008},
    {title: '12 Angry Men', year: 1957},
    {title: "Schindler's List", year: 1993}
]

const groups = [
    {title: '345345', id: 0},
    {title: '345345', id: 1},
    {title: '06879', id: 2},
    {title: '07896', id: 3},
    {title: '056665', id: 4},
    {title: "07756", id: 5}
]

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
        marginTop: theme.spacing(2),
    },
    gridContainer: {
        marginBottom: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(2, 0, 2),
    },
}));

export default function SignUp() {
    const classes = useStyles();
    const [firebaseError, setFirebaseError] = React.useState(null);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        autocomplete: null,
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
                        const {email, password} = values;
                        // setTimeout(() => {
                        //     setSubmitting(false);
                        //     alert(JSON.stringify(values, null, 2));
                        // }, 500);

                        db.createUserWithEmailAndPassword(email, password).catch((error) => {
                            console.log(error.code);
                            console.log(error.message);
                            setSubmitting(false);
                            setFirebaseError(error.message);
                        });

                    }}
                >
                    {({submitForm, isSubmitting, touched, errors}) => (
                        <Form className={classes.form}>
                            <Grid className={classes.gridContainer} container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        component={TextField}
                                        autoComplete="fname"
                                        name="firstName"
                                        variant="outlined"
                                        required
                                        // margin="normal"
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        component={TextField}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        // margin="normal"
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="lname"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        name="autocomplete"
                                        component={Autocomplete}
                                        options={options}
                                        // required
                                        getOptionLabel={(option) => option.title }
                                        fullWidth
                                        renderInput={(AutocompleteRenderInputParams) => (
                                            <MuiTextField
                                                {...AutocompleteRenderInputParams}
                                                error={touched['autocomplete'] && !!errors['autocomplete']}
                                                helperText={touched['autocomplete'] && errors['autocomplete']}
                                                label="Faculty"
                                                variant="outlined"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        name="autocomplete"
                                        component={Autocomplete}
                                        // required
                                        options={groups}
                                        getOptionLabel={(option) => option.title }
                                        fullWidth
                                        renderInput={(AutocompleteRenderInputParams) => (
                                            <MuiTextField
                                                {...AutocompleteRenderInputParams}
                                                error={touched['autocomplete'] && !!errors['autocomplete']}
                                                helperText={touched['autocomplete'] && errors['autocomplete']}
                                                label="Group"
                                                variant="outlined"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        component={TextField}
                                        name="email"
                                        label="Email Address"
                                        type="email"
                                        variant="outlined"
                                        // margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        component={TextField}
                                        variant="outlined"
                                        // margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                    />
                                </Grid>
                            </Grid>
                            {/*<FormControlLabel*/}
                            {/*    control={<Checkbox value="remember" color="primary"/>}*/}
                            {/*    label="Remember me"*/}
                            {/*/>*/}
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
                                Sign Up
                            </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link href="/signin" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>

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