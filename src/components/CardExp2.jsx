import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import useStatus from "../hooks/useStatus";
import CircularProgress from "@material-ui/core/CircularProgress";
import blue from "@material-ui/core/colors/blue";
import {FirebaseContext} from "../firebase";
import {useHistory, withRouter} from "react-router-dom";
import {Redirect} from "react-router-dom";
import LoginDialog from "./shared/LoginDialog";

const useStyles = makeStyles((theme) => ({
        card: {
            display: 'flex',
            flexDirection: 'column',
            // maxWidth: 500
        },
        cardDetails: {
            display: 'flex',
            // paddingLeft: '10px',
            // paddingTop: '10px',
            flexDirection: 'column',
        },
        content: {
            flex: '1 0 auto',
        },
        cardMedia: {
            // width: "100%",
            // maxWidth: "400px"
        },
        actions: {
            // display: 'flex',
            // justifyContent: 'left',
            marginLeft: 'auto'
        },
        wrapper: {
            margin: theme.spacing(1),
            position: 'relative',
        },
        // buttonSuccess: {
        //     backgroundColor: green[500],
        //     '&:hover': {
        //         backgroundColor: green[700],
        //     },
        // },
        // fabProgress: {
        //     color: green[500],
        //     position: 'absolute',
        //     top: -6,
        //     left: -6,
        //     zIndex: 1,
        // },
        buttonProgress: {
            color: blue[500],
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
        }
    })
);
// TODO: поменять цвет загрузки
function CardExp2({history, ...props}) {
    const classes = useStyles();

    // const buttonClassname = clsx({
    //     [classes.buttonSuccess]: success,
    // });
    // const [isLoading, setIsLoading] = React.useState(true);
    const {loading, ...labStatus } = useStatus();
    const {user, firebase} = React.useContext(FirebaseContext);

    // if (!user) {
    //     return <Redirect to="/"/>
    // }
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleSignIn = () => {
        setOpen(false);
        history.push("/signin")
    };

    const handleSignUp = () => {
        setOpen(false);
        history.push("/signup")
    };

    // if (!user) {
    //     return <Redirect to="/"/>
    // }

    function handleStartBtnClick(){
        if(!user){
            // console.log(user.uid);
            history.push('/signin')
        } else {
            const chartId = "" + new Date().getTime();
            const statusRef = firebase.database.ref('status');
            statusRef.child("currentUser").once("value", function (snapshot) {
                const currentUser = snapshot.val();
                if (currentUser === "null") {
                    statusRef.update({
                        currentUser: user.uid,
                        chartId: chartId,
                        isTimeOut: false,
                        power: "on",
                    })

                    history.push('/lab-1');

                    // window.location.href = "lab.html";
                } else if (currentUser === user.uid) {
                    statusRef.update({
                        isTimeOut: false,
                        power: "on",
                    })
                    history.push('/lab-1');
                    // window.location.href = "lab.html";
                } else if (currentUser !== "null"){
                    alert("Работа занята другим пользователем. Пожалуйста, попробуйте позже.")
                }
                // return () => statusRef.off("value");
            }, function (errorObject) {
                console.log("the read failed: " + errorObject.code);
            });

        }
    }

    function toTheory() {
        history.push("/theory");
    }

    // debugger;
    return (
        <React.Fragment>
        <LoginDialog open={open} handleClose={handleClose} handleSignUp={handleSignUp} handleSignIn={handleSignIn}/>
        <Grid item xs={12} md={8}>
            <CardActionArea component="a" href="#">
                <Card className={classes.card}>
                    {/*<Hidden xsDown>*/}
                        <CardMedia
                            component="img"
                            className={classes.cardMedia}
                            alt="Laboratory unit"
                            image={props.photo}
                            title="Laboratory unit"
                        />
                        {/*// title={post.imageTitle} />*/}
                    {/*</Hidden>*/}
                    <div className={classes.cardDetails}>
                        <CardContent>
                            <Typography component="h2" variant="h5">
                                {props.title}
                            </Typography>
                            <Typography variant="subtitle1" paragraph>
                                {props.description}
                            </Typography>
                        </CardContent>
                        <CardActions className={classes.actions}>
                            <Button size="small" color="primary" onClick={toTheory}>
                                Theory
                            </Button>
                            {/*<Button size="small" color="primary">*/}
                            {/*    Apparatus*/}
                            {/*</Button>*/}
                            <div className={classes.wrapper}>
                                <Button onClick={user?handleStartBtnClick:handleClickOpen} size="small" color="primary" disabled={loading&&user?true:false}>
                                    {(user && labStatus.currentUser == user.uid)
                                        ? 'Continue'
                                        : 'Run experiment'
                                    }
                                </Button>
                                {loading && user && <CircularProgress size={24} className={classes.buttonProgress}/>}
                            </div>
                        </CardActions>
                    </div>

                </Card>
            </CardActionArea>
        </Grid>
        </React.Fragment>
    );
}
export default withRouter(CardExp2);