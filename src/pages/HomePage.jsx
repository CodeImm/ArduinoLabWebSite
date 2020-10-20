import React from 'react';
import CardExp2 from "../components/CardExp2";
import Grid from "@material-ui/core/Grid";
import FirebaseContext from "../firebase/context";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";

const cardsExp = [
    {
        title: "Лабораторная работа Определение скорости звука в воздухе",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci alias dignissimos eaque fuga fugit id maiores nulla placeat quam quasi tempora, velit veritatis, vero! Accusamus adipisci at eum provident voluptates."
    },
    {
        title: "Лабораторная работа 2 Определение скорости звука в воздухе",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci alias dignissimos eaque fuga fugit id maiores nulla placeat quam quasi tempora, velit veritatis, vero! Accusamus adipisci at eum provident voluptates."
    }
]

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

    const [cards] = cardsExp;
    return (
        <React.Fragment>
            <Container maxWidth="md" component="main">
                <Grid container className={classes.mainGrid} spacing={spacing} justify="center">
                    {/*{[0, 1, 2].map((value) => (*/}
                    {cardsExp.map((card) => (
                        <CardExp2 key={card.title} title={card.title} description={card.description}/>
                    ))}
                </Grid>
            </Container>
            {/*<Grid container spacing={5} className={classes.mainGrid}>*/}
            {/*    <Main title="From the firehose" posts={posts} />*/}
            {/*    <Sidebar*/}
            {/*        title={sidebar.title}*/}
            {/*        description={sidebar.description}*/}
            {/*        archives={sidebar.archives}*/}
            {/*        social={sidebar.social}*/}
            {/*    />*/}
            {/*</Grid>*/}
        </React.Fragment>
    );
}