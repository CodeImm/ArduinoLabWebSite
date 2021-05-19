import React from "react";
import firebase from "../firebase";

function useAuth() {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(()=> {
        return firebase.checkAuth(user => {
            user ? setUser(user) : setUser(null);
            setLoading(false);
        }, []);
    })

    return {user, loading}
}

export default useAuth;