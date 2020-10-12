import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
        // maxWidth: 1000,
    },
    details: {
        display: 'flex',
        // paddingLeft: '10px',
        // paddingTop: '10px',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 300,
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
        <Card className={classes.root}>
            {/*<CardActionArea>*/}

                <CardMedia
                    component="img"
                    className={classes.cover}
                    alt="Contemplative Reptile"
                    height="140"
                    image="https://source.unsplash.com/random"
                    title="Contemplative Reptile"
                />
            <div className={classes.details}>
                <CardContent  className={classes.content}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.description}
                    </Typography>
                </CardContent>

            {/*</CardActionArea>*/}
            <CardActions className={classes.actions}>
                <Button size="small" color="primary">
                    Theory
                </Button>
                <Button size="small" color="primary">
                    Apparatus
                </Button>
                <Button size="small" color="primary">
                    Test
                </Button>
                <Button size="small" color="primary">
                    Run experiment
                </Button>
            </CardActions>
            </div>
        </Card>
    );
}