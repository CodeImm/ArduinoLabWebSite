import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles({
    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
    },
    // cardMedia: {
    //     width: 160,
    // },
});

const featuredPosts =
    {
        title: 'Featured post',
        date: 'Nov 12',
        description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.',
        image: 'https://source.unsplash.com/random',
        imageText: 'Image Text',
    }
    // {
    //     title: 'Post title',
    //     date: 'Nov 11',
    //     description:
    //         'This is a wider card with supporting text below as a natural lead-in to additional content.',
    //     image: 'https://source.unsplash.com/random',
    //     imageText: 'Image Text',
    // },
    // ;

export default function CardExp() {
    const classes = useStyles();
    const post = featuredPosts;

    return (
        <Grid item xs={12} md={6}>
            <CardActionArea component="a" href="#">
                <Card className={classes.card}>
                    <div className={classes.cardDetails}>
                        <CardContent>
                            <Typography component="h2" variant="h5">
                                {post.title}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                {post.date}
                            </Typography>
                            <Typography variant="subtitle1" paragraph>
                                {post.description}
                            </Typography>
                            <Typography variant="subtitle1" color="primary">
                                Continue reading...
                            </Typography>
                        </CardContent>
                    </div>
                    <Hidden xsDown>
                        <CardMedia className={classes.cardMedia} image={post.image} title={post.imageTitle} />
                    </Hidden>
                </Card>
            </CardActionArea>
        </Grid>
    );
}