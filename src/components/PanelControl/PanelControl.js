import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './../shared/Title';
import {FirebaseContext} from "../../firebase";
import Button from '@material-ui/core/Button';
// import {Checkbox, } from 'formik-material-ui';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Field, Form, Formik} from 'formik';
import MaterialSlider from "../shared/MaterialSlider";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import * as Yup from "yup";
import MaterialField from "../shared/MaterialField";
import LinearProgressWithLabel from "../shared/LinearProgressWithLable";
import CircularProgress from "@material-ui/core/CircularProgress";
import blue from "@material-ui/core/colors/blue";
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles(theme => ({
    depositContext: {
        flex: 1,
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonProgress: {
        color: blue[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    }
}));

const ControlSchema = Yup.object().shape({
    frequency: Yup.number()
        .lessThan(10000, "Must be between 30Hz and 10000Hz")
        .moreThan(30, "Must be between 30Hz and 10000Hz")
        .required("Required")
})


export default function PanelControl({
                                         isSubmitting,
                                         toggleIsSubmitting,
                                         isChartInitialized,
                                         isAutoSubmitting,
                                         isCancelAutoSubmitting,
                                         toggleIsAutoSubmitting,
                                         countAutoSubmitting,
                                         setCountAutoSubmitting,
                                         toggleIsCancelAutoSubmitting,
                                         ...props
                                     }) {
    const classes = useStyles();
    const {user, firebase} = React.useContext(FirebaseContext);
    const [firebaseError, setFirebaseError] = React.useState(null);
    const [progress, setProgress] = React.useState(0);
    const [stepProgress, setStepProgress] = React.useState(0);
    const [frequenciesArray, setFrequenciesArray] = React.useState([]);
    const [count, setCount] = React.useState(countAutoSubmitting);
    const [isReady, setIsReady] = React.useState(false);
    const statusRef = firebase.database.ref('status');
    const bpStateRef = firebase.database.ref('status/bpState');
    const isReadyRef = firebase.database.ref('status/isReady');

    React.useEffect(() => {
        checkReadiness();
        // return () => unsubscribe();
        // console.log(points);
    }, [user]);

    function checkReadiness() {
        if (user) {
            isReadyRef.on("value", (snap) => {
                if (snap.val() == true) {
                    setIsReady(true);
                }else{
                    setIsReady(false);
                }
            })
            return () => isReadyRef.off("value");
        }
    }

    React.useEffect(() => {
        getNextPoint();
    });

    function getNextPoint() {
        if (!isSubmitting && isAutoSubmitting && countAutoSubmitting !== 0) {
            try {
                statusRef.update({
                    frequency: frequenciesArray[0],
                    bpState: true,
                });
                setFrequenciesArray(prevState => {
                    prevState.shift();
                    return prevState;
                })
                setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + stepProgress));
                toggleIsSubmitting(true);
                // setCanceling(false);
            } catch (error) {
                // setSubmitting(false);
                setFirebaseError(error.message);
            }
        } else if (!isSubmitting && countAutoSubmitting === 0) {
            toggleIsCancelAutoSubmitting(false);
            toggleIsAutoSubmitting(false);
            setProgress(0);
        }
        // }else if (isSubmitting){
        //     toggleIsAutoSubmitting(false);
        //     toggleIsSubmitting(false);
        //     toggleIsCancelAutoSubmitting(false);
        // }
    }

    function valuetext(value) {
        return `${value}°C`;
    }

    return (
        <React.Fragment>
            <Title>Control</Title>
            <Formik
                initialValues={{
                    frequency: 2000,
                    auto: false,
                    range: [2000, 6000],
                    step: 100,
                }}
                validationSchema={ControlSchema}
                onSubmit={(values) => {
                    if (values.auto && frequenciesArray.length === 0) {
                        const numberSteps = Math.floor((values.range[1] - values.range[0]) / values.step);
                        const frequencies = [];
                        for (let i = 0; i <= numberSteps; i++) {
                            frequencies[i] = values.range[0] + values.step * i;
                        }
                        setFrequenciesArray(frequencies);
                        setCountAutoSubmitting(frequencies.length);
                        setStepProgress(100 / (numberSteps + 2));
                        toggleIsAutoSubmitting(true);
                        toggleIsSubmitting(true);
                    } else if (isAutoSubmitting) {
                        setCountAutoSubmitting([]);
                        toggleIsAutoSubmitting(false);
                        setStepProgress(0);
                        setProgress(0);
                        setFrequenciesArray([]);
                        toggleIsCancelAutoSubmitting(true);
                    } else {
                        toggleIsSubmitting(true);
                        try {
                            statusRef.update({
                                frequency: values.frequency,
                                bpState: true,
                            });
                        } catch (error) {
                            toggleIsSubmitting(false);
                            setFirebaseError(error.message);
                        }
                    }
                    // setTimeout(() => {
                    //     alert(JSON.stringify(values, null, 2));
                    //     toggleIsSubmitting(false);
                    // }, 2000);
                }}
            >
                {({handleChange, handleBlur, values, dirty, isValid, errors}) => (
                    <Form>
                        <MaterialField
                            as={TextField}
                            variant="outlined"
                            margin="normal"
                            size="small"
                            required
                            fullWidth
                            name="frequency"
                            label="Frequency (Hz)"
                            type="number"
                            step={100}
                            error={!!errors.frequency}
                            id="frequency"
                            autoComplete="none"
                            autoFocus
                            disabled={values.auto}
                        />

                        <FormControlLabel
                            control={
                                <Field
                                    as={Switch}
                                    checked={values.auto}
                                    name="auto"
                                    color="primary"
                                    disabled={isAutoSubmitting}
                                />
                            }
                            label="Auto"
                        />

                        {values.auto &&
                        <>
                            <Typography id="discrete-slider" gutterBottom>
                                Frequency Range
                            </Typography>
                            <MaterialSlider
                                name="range"
                                id="range"
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                getAriaValueText={valuetext}
                                step={10}
                                min={30}
                                max={10000}
                                disabled={isAutoSubmitting}
                            />
                            <Typography id="discrete-slider" gutterBottom>
                                Step
                            </Typography>
                            <MaterialSlider
                                name="step"
                                id="step"
                                defaultValue={100}
                                getAriaValueText={valuetext}
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="auto"
                                step={10}
                                marks
                                min={10}
                                max={200}
                                disabled={isAutoSubmitting}
                            />
                            {isAutoSubmitting &&
                            <LinearProgressWithLabel value={progress}/>
                            }
                        </>
                        }
                        <div className={classes.wrapper}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={!isValid || (!isAutoSubmitting && isSubmitting)||!isReady}
                                className={classes.submit}
                            >
                                {(isAutoSubmitting || isCancelAutoSubmitting) ? "Cancel" : "Signal"}
                            </Button>
                            {isCancelAutoSubmitting || !isReady && <CircularProgress size={24} className={classes.buttonProgress}/>}
                        </div>
                    </Form>
                )}
            </Formik>

        </React.Fragment>
    );
}