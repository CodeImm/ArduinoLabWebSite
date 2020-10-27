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
import SvgIcon from "@material-ui/core/SvgIcon";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import TimelineOutlinedIcon from '@material-ui/icons/TimelineOutlined';
import ImportCVGIcon from '../assert/icons/ExportCsvIcon';
import ExportCsvIcon from "../assert/icons/ExportCsvIcon";

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


export default function LabPage(props) {
    const {firebase, user} = React.useContext(FirebaseContext);
    const [spacing, setSpacing] = React.useState(2);
    const classes = useStyles();

    const graphPaper = clsx(classes.paper, classes.graph);
    const onAllHeightPaper = clsx(classes.paper, classes.onAllHeight);


    return (
        <React.Fragment>
            <Container maxWidth="md" component="main">
                <Grid container className={classes.mainGrid} spacing={spacing} justify="center">
                        <Grid item xs={12} md={8} lg={9} >
                            <Paper className={graphPaper}>
                                <Chart {...props} />
                            </Paper>
                            <Paper className={classes.actions}>
                                <IconButton  >
                                    <BackspaceRoundedIcon/>
                                </IconButton>
                                <IconButton>
                                    <DeleteIcon/>
                                </IconButton>
                                <IconButton >
                                    <ClearOutlinedIcon/>
                                </IconButton>
                                <IconButton >
                                    <ExportCsvIcon/>
                                </IconButton>
                            </Paper>
                        </Grid>


                    {/* Control */}
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper className={onAllHeightPaper}>
                            <PanelControl {...props}/>
                        </Paper>
                    </Grid>
                </Grid>

            </Container>
        </React.Fragment>
    );
}