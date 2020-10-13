import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import {TextField} from 'formik-material-ui';
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
import {Field, Form, Formik, FormikContext, useFormikContext} from 'formik';
import LinearProgress from "@material-ui/core/LinearProgress";
// import {TextField} from "formik-material-ui";

import {db} from "../firestore/index";
// import TextField from "@material-ui/core/TextField";

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
                        faculty: null,
                        group: null
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
                        setTimeout(() => {
                            setSubmitting(false);
                            alert(JSON.stringify(values, null, 2));
                        }, 500);

                        // db.createUserWithEmailAndPassword(email, password).catch((error) => {
                        //     console.log(error.code);
                        //     console.log(error.message);
                        //     setSubmitting(false);
                        //     setFirebaseError(error.message);
                        // });

                    }}
                >
                    {({submitForm, isSubmitting, touched, errors, values}) => (
                        <MyForm firebaseError={firebaseError}/>
                    )}
                </Formik>
            </div>
        </Container>
    );
}

export function MyForm(props) {
    const classes = useStyles();

    const [facultiesData, setFacultiesData] = React.useState([]);
    const [groupsData, setGroupsData] = React.useState([]);
    const [groupsAccordingToSelectedFaculty, setGroupsAccordingToSelectedFaculty] = React.useState([]);

    const {errors, values, isSubmitting, touched} = useFormikContext(); // formikProps

    React.useEffect(() => {
        getFacultiesData();
    }, [])

    React.useEffect(() => {
        facultiesData.forEach(faculty => {
            if (faculty && values.faculty && faculty.name === values.faculty.name) {
                // debugger;
                setGroupsAccordingToSelectedFaculty(groupsData.find(x => x.id === faculty.id).groups);
                console.log(groupsAccordingToSelectedFaculty);
            }
        })
    }, [values, facultiesData])

    function getFacultiesData() {
        db.collection('facultiesData').onSnapshot(handleSnapshot);
    }

    function handleSnapshot(snapshot) {
        const facultiesData = snapshot.docs.map(doc => {
            return {id: doc.id, name: doc.data().name};
        });

        const groupsData = snapshot.docs.map(doc => {
            return {id: doc.id, groups: doc.data().groups};//.map(group => group.number)};
        })

        console.log(Array.from(facultiesData));
        console.log(Array.from(groupsData));

        setFacultiesData(Array.from(facultiesData));
        setGroupsData(Array.from(groupsData));
    }

    return (
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
                        name="faculty"
                        component={Autocomplete}
                        options={facultiesData}
                        getOptionLabel={(option) => option.name}
                        fullWidth
                        renderInput={(AutocompleteRenderInputParams) => (
                            <MuiTextField
                                {...AutocompleteRenderInputParams}
                                error={touched['autocomplete'] && !!errors['autocomplete']}
                                helperText={
                                    touched['autocomplete'] && errors['autocomplete']
                                }
                                required
                                label="Faculty"
                                variant="outlined"
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Field
                        name="group"
                        component={Autocomplete}
                        options={groupsAccordingToSelectedFaculty}
                        getOptionLabel={(option) => {
                            // debugger;
                            // console.log(value);
                            return option.number;
                        }}
                        fullWidth
                        renderInput={(AutocompleteRenderInputParams) => (
                            <MuiTextField
                                {...AutocompleteRenderInputParams}
                                error={touched['autocomplete'] && !!errors['autocomplete']}
                                helperText={
                                    touched['autocomplete'] && errors['autocomplete']
                                }
                                required
                                label="Group"
                                variant="outlined"
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
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
            {props.firebaseError && <Typography color="error">{props.firebaseError}</Typography>}
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
            {/*<AutoSubmitToken/>*/}
        </Form>
    );
}