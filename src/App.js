import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import SignIn from './components/Auth/SignIn';
import Loading from './components/shared/Loading';
import useAuth from './hooks/useAuth';
import HomePage from "./pages/HomePage";
import SignUp from "./components/Auth/SignUp";
import Recovery from "./components/Auth/Recovery";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "./components/shared/Header";
import Copyright from "./components/shared/Copyright";
import Box from "@material-ui/core/Box";
import firebase, {FirebaseContext} from "./firebase";

export default function App() {
    const {user, loading} = useAuth();

    if (loading) return <Loading/>;
    return user ? <AuthApp user={user}/> : <UnAuthApp/>;
}

function AuthApp({user}) {
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
                        </Switch>
                    </main>
                    {/*<Footer title="Footer" description="Something here to give the footer a purpose!" />*/}
                    <Box mt={5}>
                        <Copyright/>
                    </Box>
                </Container>
            </FirebaseContext.Provider>
        </BrowserRouter>
    )
}

function UnAuthApp({user}) {
    return (
        <FirebaseContext.Provider value={user}>
            <BrowserRouter>
                <CssBaseline/>
                <Container maxWidth="lg">
                    <Header/>
                    <main>
                        <Switch>
                            <Route path="/signup" component={SignUp}/>
                            <Route path="/signin" component={SignIn}/>
                            <Route path="/recovery" component={Recovery}/>
                        </Switch>
                    </main>
                    {/*<Footer title="Footer" description="Something here to give the footer a purpose!" />*/}
                    <Box mt={5}>
                        <Copyright/>
                    </Box>
                </Container>
            </BrowserRouter>
        </FirebaseContext.Provider>
    )
}