import React from "react";
import firebase from "../firebase";

function useAuth() {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(()=> {
        return firebase.checkAuth(user => {
            setLoading(false);
            user ? setUser(user) : setUser(null);
        }, []);
    })

    return {user, loading}
}

export default useAuth;