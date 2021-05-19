import React from 'react';
import Grid from "@material-ui/core/Grid";
import FirebaseContext from "../firebase/context";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme)=>({
    mainGrid: {
        display: 'flex',
        flexGrow: 1,
        paddingTop: theme.spacing(3)
    }
}));

export default function HomePage() {
    const {user, firebase} = React.useContext(FirebaseContext);
    const [spacing, setSpacing] = React.useState(2);
    const classes = useStyles();

    return (
        <React.Fragment>
            <Container maxWidth="md" component="main">
                <Grid container className={classes.mainGrid} spacing={spacing} justify="center">
                    <iframe className="doc"
                            src="https://drive.google.com/file/d/1RRJoTvCfuM9Y6z856oNmzSv6zZvRXjc8/preview"
                            width="700" height="500"></iframe>
                </Grid>
            </Container>
        </React.Fragment>
    );
}