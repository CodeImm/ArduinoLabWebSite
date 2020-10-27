import React from 'react';
import Grid from "@material-ui/core/Grid";
import FirebaseContext from "../firebase/context";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Chart from "../components/Chart/Chart";
import clsx from "clsx";
import PanelControl from "../components/PanelControl/PanelControl";
import BackspaceRoundedIcon from '@material-ui/icons/BackspaceRounded';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import ExportCsvIcon from '../assert/icons/ExportCsvIcon';
import AlertDialog from "../components/shared/AlertDialog";

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        display: 'flex',
        flexGrow: 1,
        paddingTop: theme.spacing(2),
    },
    leftGrid: {
        display: 'flex',
        flexDirection: 'column',
        // flexGrow: 1,
        paddingTop: theme.spacing(2)
    },
    title: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'none',
        flexDirection: 'column',
    },
    actions: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'none',
        justifyContent: "space-between"
    },
    graph: {
        height: "350px",
        marginBottom: theme.spacing(1),
    },
    onAllHeight: {
        height: '100%',
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

function createData(frequency, amplitude) {
    return {frequency, amplitude};
}

export default function LabPage({
                                    isSubmitting,
                                    toggleIsSubmitting,
                                    isAutoSubmitting,
                                    toggleIsAutoSubmitting,
                                    countAutoSubmitting,
                                    setCountAutoSubmitting,
                                    decreaseCountAutoSubmitting,
                                    toggleIsCancelAutoSubmitting,
                                    isCancelAutoSubmitting,
                                    ...props
                                }) {
    const {firebase, user} = React.useContext(FirebaseContext);
    const [spacing, setSpacing] = React.useState(2);
    const classes = useStyles();

    const graphPaper = clsx(classes.paper, classes.graph);
    const onAllHeightPaper = clsx(classes.paper, classes.onAllHeight);

    const statusRef = firebase.database.ref('status');
    const chartIdRef = firebase.database.ref('status/chartId');
    const [data, setData] = React.useState([]);
    // console.log(user.uid);

    React.useEffect(() => {
        getPoints();
        // return () => unsubscribe();
        // console.log(points);
    }, [user]);


    function getPoints() {
        if (user) {
            //TODO: убрать два условия ниже, chartId передавать через props
            chartIdRef.once("value").then(function (snap) {
                if (snap.val() !== "null") {
                    const pointsRefStr = 'users/' + user.uid + '/charts/' + snap.val();
                    const chartRef = firebase.database.ref(pointsRefStr);
                    chartRef.on('child_added', snapshot => {
                        const addedData = snapshot.val();
                        setData(prevState => {
                            return [...prevState, createData(addedData.x, addedData.y)]
                        });
                        toggleIsCancelAutoSubmitting(false);
                        toggleIsSubmitting(false);
                        decreaseCountAutoSubmitting();

                        // }
                    })
                    return () => chartRef.off("value");
                }
            });
        }
    }

    function removeLastPoint() {
        if (user) {
            const ref = firebase.database.ref('status/chartId');
            ref.once("value").then(function (snap) {
                if (snap.val()) {
                    const refStr = 'users/' + user.uid + '/charts/' + snap.val();
                    const refChart = firebase.database.ref(refStr);
                    refChart.once("value").then(function (snap) {
                        if (snap.val()) {
                            const lastPointPath = refStr + "/" + Object.keys(snap.val())[Object.keys(snap.val()).length - 1];
                            const lastPointRef = firebase.database.ref(lastPointPath);
                            lastPointRef.remove();
                            setData(prevState => {
                                prevState.pop();
                                return [...prevState]
                            });
                        }
                    });
                }
            });
        }
    }

    function removeAllPoints() {
        if (user) {
            const ref = firebase.database.ref('status/chartId');
            ref.once("value").then(function (snap) {
                if (snap.val()) {
                    const refStr = 'users/' + user.uid + '/charts/' + snap.val();
                    const refChart = firebase.database.ref(refStr);
                    // console.log(refStr);
                    refChart.remove();
                    setData([]);
                }
            });
        }
        return;
    }

    function exportCsv() {
        if (data.length > 0) {
            let csv = '';
            for (let i = 0; i < data.length; i++) { // выведет 0, затем 1, затем 2
                // console.log(config.data.labels[i]);
                csv += data[i].frequency + ';' + data[i].amplitude + '\x0D\x0A';
            }
            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv));
            element.setAttribute('download', 'chart.csv');

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
        } else {
            alert('Ошибка: нет данных для сохранения!');
        }
    }
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleСonfirm= () => {
        removeAllPoints();
        setOpen(false);
    };

    const disableIcon = isSubmitting || isAutoSubmitting || isCancelAutoSubmitting;
    return (
        <React.Fragment>
            <AlertDialog open={open} handleClose={handleClose} handleСonfirm={handleСonfirm}/>
            <Container maxWidth="md" component="main">
                <Grid container className={classes.mainGrid} spacing={spacing} justify="center">
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper className={graphPaper}>
                            <Chart data={data} {...props} />
                        </Paper>
                        <Paper className={classes.actions}>
                            <div>
                                {/*<IconButton onClick={()=>{removeAllPoints()}} color={disableIcon?"default": "primary"} disabled={disableIcon}>*/}
                                {/*    <ClearOutlinedIcon />*/}
                                {/*</IconButton>*/}
                                <IconButton onClick={() => {
                                    exportCsv()
                                }} color={disableIcon ? "default" : "secondary"} disabled={disableIcon}>
                                    <ExportCsvIcon/>
                                </IconButton>
                            </div>
                            <div>
                                <IconButton onClick={() => {
                                    handleClickOpen()
                                }} color={disableIcon ? "default" : "primary"} disabled={disableIcon}>
                                    <DeleteIcon/>
                                </IconButton>
                                <IconButton onClick={() => {
                                    removeLastPoint()
                                }} color={disableIcon ? "default" : "primary"} disabled={disableIcon}>
                                    <BackspaceRoundedIcon/>
                                </IconButton>
                            </div>
                        </Paper>
                    </Grid>


                    {/* Control */}
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper className={onAllHeightPaper}>
                            <PanelControl
                                isSubmitting={isSubmitting}
                                toggleIsSubmitting={toggleIsSubmitting}
                                isAutoSubmitting={isAutoSubmitting}
                                isCancelAutoSubmitting={isCancelAutoSubmitting}
                                toggleIsAutoSubmitting={toggleIsAutoSubmitting}
                                countAutoSubmitting={countAutoSubmitting}
                                setCountAutoSubmitting={setCountAutoSubmitting}
                                toggleIsCancelAutoSubmitting={toggleIsCancelAutoSubmitting} {...props}/>
                        </Paper>
                    </Grid>
                </Grid>

            </Container>
        </React.Fragment>
    );
}