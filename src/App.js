import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import SignIn from './components/SignIn';
import Loading from './components/shared/Loading';
import useAuth from './hooks/useAuth';

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
          {/*<Route path="/" component={HomePage}/>*/}
        </UserContext.Provider>
      {/*</Switch>*/}
    </BrowserRouter>
  )
}

function UnAuthApp(){
    return <SignIn />;
}

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }