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

const useStyles = makeStyles({
    card: {
        display: 'flex',
        flexDirection: 'row',
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
        width: 150,
    },
    actions: {
        // display: 'flex',
        // justifyContent: 'left',
        marginLeft: 'auto'
    }
});

export default function CardExp2(props) {
    const classes = useStyles();
    return (
        <Grid item xs={12} md={6}>
            <CardActionArea component="a" href="#">
                <Card className={classes.card}>
                    <div className={classes.cardDetails}>
                        <CardContent>
                            <Typography component="h2" variant="h5">
                                {props.title}
                            </Typography>
                            <Typography variant="subtitle1" paragraph>
                                {props.description}
                            </Typography>
                            <CardActions className={classes.actions}>
                                <Button size="small" color="primary">
                                    Theory
                                </Button>
                                <Button size="small" color="primary">
                                    Apparatus
                                </Button>
                                <Button size="small" color="primary">
                                    Run experiment
                                </Button>
                            </CardActions>
                        </CardContent>
                    </div>
                    <Hidden xsDown>
                        <CardMedia
                            component="img"
                            className={classes.cardMedia}
                            alt="Contemplative Reptile"
                            image="https://source.unsplash.com/random"
                            title="Contemplative Reptile"
                        />
                        {/*// title={post.imageTitle} />*/}
                    </Hidden>
                </Card>
            </CardActionArea>
        </Grid>
        // <Grid item xs={12} md={6}>
        //     <Card className={classes.card}>
        //         {/*<CardActionArea>*/}
        //
        //         <CardMedia
        //             component="img"
        //             className={classes.cover}
        //             alt="Contemplative Reptile"
        //             height="140"
        //             image="https://source.unsplash.com/random"
        //             title="Contemplative Reptile"
        //         />
        //         <div className={classes.cardDetails}>
        //             <CardContent className={classes.content}>
        //                 <Typography gutterBottom variant="h5" component="h2">
        //                     {props.title}
        //                 </Typography>
        //                 <Typography variant="body2" color="textSecondary" component="p">
        //                     {props.description}
        //                 </Typography>
        //             </CardContent>
        //
        //             {/*</CardActionArea>*/}
        //             <CardActions className={classes.actions}>
        //                 <Button size="small" color="primary">
        //                     Theory
        //                 </Button>
        //                 <Button size="small" color="primary">
        //                     Apparatus
        //                 </Button>
        //                 <Button size="small" color="primary">
        //                     Test
        //                 </Button>
        //                 <Button size="small" color="primary">
        //                     Run experiment
        //                 </Button>
        //             </CardActions>
        //         </div>
        //     </Card>
        // </Grid>
    );
}