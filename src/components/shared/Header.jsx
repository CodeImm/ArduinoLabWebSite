import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import firebase from "../../firebase";

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
        },
    },
}));

export default function Header() {
    const classes = useStyles();

    const handleLogOutClick = () => {
        firebase.logOut();
    }

    return (
        <React.Fragment>
            <CssBaseline/>
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                        PhysLab
                    </Typography>
                    <nav>
                        <Link variant="button" color="textPrimary" href="/home" className={classes.link}>
                            Home
                        </Link>
                        <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                            Experiments
                        </Link>
                        <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                            About Lab
                        </Link>
                        <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                            Contact
                        </Link>
                        {/*<Link variant="button" color="textPrimary" href="#" className={classes.link}>*/}
                        {/*    Enterprise*/}
                        {/*</Link>*/}
                        <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                            Support
                        </Link>
                    </nav>
                    {/*{(!user) &&*/}
                    <Button onClick={handleLogOutClick} color="primary" variant="outlined" className={classes.link}>
                        Logout
                    </Button>
                    {/*}*/}
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}