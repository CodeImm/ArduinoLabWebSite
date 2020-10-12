import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import SignIn from './components/SignIn';
import Loading from './components/shared/Loading';
import useAuth from './hooks/useAuth';
import HomePage from "./pages/HomePage";
import SignUp from "./components/SignUp";
import Recovery from "./components/Recovery";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "./components/shared/Header";
import Copyright from "./components/shared/Copyright";
import Box from "@material-ui/core/Box";

export default function App() {
    const {user, loading} = useAuth();

    if (loading) return <Loading/>;
    return user ? <AuthApp user={user}/> : <UnAuthApp/>;
}

export const UserContext = React.createContext();

function AuthApp({user}) {
    return (
        <BrowserRouter>
            {/*<Switch>*/}
            <UserContext.Provider value={user}>
                {/*<Route path="/:listId" component={ListPage}/>*/}
                <CssBaseline/>
                <Container maxWidth="lg">
                    <Header/>
                    <main>
                        <Route exact path="/home" component={HomePage}/>
                    </main>
                    {/*<Footer title="Footer" description="Something here to give the footer a purpose!" />*/}
                    <Box mt={5}>
                        <Copyright/>
                    </Box>
                </Container>
            </UserContext.Provider>
            {/*</Switch>*/}
        </BrowserRouter>
    )
}

function UnAuthApp() {
    return (
        <BrowserRouter>
            {/*<Switch>*/}
            <CssBaseline/>
            <Container maxWidth="lg">
                <Header/>
                <main>
                    <Route path="/signup" component={SignUp}/>
                    <Route path="/signin" component={SignIn}/>
                    <Route path="/recovery" component={Recovery}/>
                </main>
                {/*<Footer title="Footer" description="Something here to give the footer a purpose!" />*/}
                <Box mt={5}>
                    <Copyright/>
                </Box>
            </Container>
            {/*</Switch>*/}
        </BrowserRouter>
    )
}