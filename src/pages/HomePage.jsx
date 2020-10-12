import React from 'react';
import CardExp2 from "../components/CardExp2";
import Grid from "@material-ui/core/Grid";
import {UserContext} from "../App";

const cardsExp = [
    {
        title: "Лабораторная работа Определение скорости звука в воздухе",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci alias dignissimos eaque fuga fugit id maiores nulla placeat quam quasi tempora, velit veritatis, vero! Accusamus adipisci at eum provident voluptates."
    }
]

export default function HomePage() {
    const user = React.useContext(UserContext)

    const [cards] = cardsExp;
    return (
        <React.Fragment>
                                {/*<MainFeaturedPost post={mainFeaturedPost} />*/}
                    <Grid >
                        {cardsExp.map((card) => (
                            <CardExp2 key={card.title} title={card.title} description={card.description} />
                        ))}
                    </Grid>
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