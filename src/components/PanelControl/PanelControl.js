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

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

const ControlSchema = Yup.object().shape({
    frequency: Yup.number()
        .lessThan(10000, "Must be between 30Hz and 10000Hz")
        .moreThan(30, "Must be between 30Hz and 10000Hz")
        .required("Required")
})


export default function PanelControl() {
    const classes = useStyles();
    const [step, setStep] = React.useState(10);
    const {user, firebase} = React.useContext(FirebaseContext);
    const [firebaseError, setFirebaseError] = React.useState(null);
    const [progress, setProgress] = React.useState(10);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);

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
                    step: 10,
                }}
                validationSchema={ControlSchema}
                onSubmit={(values, {setSubmitting}) => {
                    const {frequency} = values;
                    const statusRef = firebase.database.ref('status');
                    if(values.auto){

                    }else{
                        try {
                            statusRef.update({
                                frequency: frequency,
                                bpState: true,
                            });
                        } catch (error) {
                            setSubmitting(false);
                            setFirebaseError(error.message);
                        }

                    }
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({isSubmitting, handleChange, handleBlur, values, dirty, isValid, errors}) => (
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
                            step="100"
                            error={!!errors.frequency}
                            id="frequency"
                            autoComplete="none"
                            autoFocus
                            disabled={values.auto}
                        />

                        <FormControlLabel
                            control={<Field as={Checkbox} type="checkbox" color="primary"
                                            name="auto"/>}
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
                            />
                            <Typography id="discrete-slider" gutterBottom>
                                Step
                            </Typography>
                            <MaterialSlider
                                name="step"
                                id="step"
                                defaultValue={10}
                                getAriaValueText={valuetext}
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="auto"
                                step={10}
                                marks
                                min={10}
                                max={200}
                            />
                            <LinearProgressWithLabel value={progress} />
                        </>
                        }
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={!isValid || isSubmitting}
                            className={classes.submit}
                        >
                            Signal
                        </Button>
                    </Form>
                )}
            </Formik>
        </React.Fragment>
    );
}