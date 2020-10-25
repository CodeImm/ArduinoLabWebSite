import React from 'react';
import Grid from "@material-ui/core/Grid";
import FirebaseContext from "../firebase/context";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Chart from "../components/Chart/Chart";
import clsx from "clsx";
import PanelControl from "../components/PanelControl/PanelControl";

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        display: 'flex',
        flexGrow: 1,
        paddingTop: theme.spacing(3)
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
    fixedHeight: {
        height: 300,
    },
}));


export default function LabPage() {
    const {firebase, user} = React.useContext(FirebaseContext);
    const [spacing, setSpacing] = React.useState(2);
    const classes = useStyles();

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <React.Fragment>
            <Container maxWidth="md" component="main">
                <Grid container className={classes.mainGrid} spacing={spacing} justify="center">
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper className={fixedHeightPaper}>
                            <Chart/>
                        </Paper>
                    </Grid>
                    {/* Control */}
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper className={fixedHeightPaper}>
                            <PanelControl />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
}