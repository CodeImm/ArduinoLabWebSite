import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import SignIn from './components/SignIn';
import Loading from './components/shared/Loading';
import useAuth from './hooks/useAuth';
import HomePage from "./pages/HomePage";
import SignUp from "./components/SignUp";
import Recovery from "./components/Recovery";

export const UserContext = React.createContext();

export default function App() {
    const {user, loading} = useAuth();

    if(loading) return <Loading/>;
    return user ? <AuthApp user={user} /> : <UnAuthApp />;
}

function AuthApp({user}){
  return (
    <BrowserRouter>
      {/*<Switch>*/}
        <UserContext.Provider value={user}>
          {/*<Route path="/:listId" component={ListPage}/>*/}
          <Route exact path="/home" component={HomePage}/>
        </UserContext.Provider>
      {/*</Switch>*/}
    </BrowserRouter>
  )
}

function UnAuthApp(){
    return (
        <BrowserRouter>
            {/*<Switch>*/}
                <Route path="/signup" component={SignUp}/>
                <Route path="/signin" component={SignIn}/>
                <Route path="/recovery" component={Recovery}/>
            {/*</Switch>*/}
        </BrowserRouter>
    )
}