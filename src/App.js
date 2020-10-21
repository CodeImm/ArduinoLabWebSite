import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Loading from './components/shared/Loading';
import useAuth from './hooks/useAuth';
import HomePage from "./pages/HomePage";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "./components/shared/Header";
import Copyright from "./components/shared/Copyright";
import Box from "@material-ui/core/Box";
import firebase, {FirebaseContext} from "./firebase";
import SignUp from "./components/Auth/SignUp";
import SignIn from "./components/Auth/SignIn";
import Recovery from "./components/Auth/Recovery";
import LabPage from "./pages/LabPage";

export default function App() {
    const {user, loading} = useAuth();

    if (loading) return <Loading/>;

    return (
        <BrowserRouter>
            <FirebaseContext.Provider value={{user, firebase}}>
                {/*<Route path="/:listId" component={ListPage}/>*/}
                <CssBaseline/>
                <Container maxWidth="lg">
                    <Header/>
                    <main>
                        <Switch>
                            <Route exact path="/" render={() => <Redirect to="/home"/>}/>
                            <Route exact path="/home" component={HomePage}/>
                            <Route exact path="/signup" component={SignUp}/>
                            <Route exact path="/signin" component={SignIn}/>
                            <Route exact path="/recovery" component={Recovery}/>
                            <Route exact path="/lab-1" component={LabPage}/>
                        </Switch>
                    </main>
                    {/*<Footer title="Footer" description="Something here to give the footer a purpose!" />*/}
                    <Box mt={5}>
                        <Copyright/>
                    </Box>
                </Container>
            </FirebaseContext.Provider>
        </BrowserRouter>
    );
}
