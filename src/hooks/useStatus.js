import React, {useContext} from "react";
import firebase, {FirebaseContext} from "../firebase";


function useStatus() {
    const labStatusRef = firebase.database.ref('status');
    const [loading, setLoading] = React.useState(true);
    const [labStatus, setLabStatus] = React.useState(null);
    const {user} = React.useContext(FirebaseContext);

    React.useEffect(() => {
        if(user) {
            labStatusRef.on('value', snapshot => {
                // debugger
                // const usersQueue = snapshot.child("currentUser").val();
                setLabStatus(snapshot.val());
                setLoading(false);
            })
            return () => labStatusRef.off("value");
        }else{
            setLoading(false);
        }
    }, []);

    return {loading, ...labStatus}

    // const statusRef = firebase.database().ref('status');
    // statusRef.on('value', function (snapshot) {
    //     var currentUser = snapshot.child("currentUser").val();
    //     if (currentUser == firebase.auth().currentUser.uid) {
    //         $("#start_btn").removeClass("button--disable");
    //         $("#start_btn").html("Продолжить");
    //     } else if (currentUser == "null") {
    //         $("#start_btn").removeClass("button--disable");
    //         $("#start_btn").html("Начать");
    //     } else {
    //         $("#start_btn").addClass("button--disable");
    //         $("#start_btn").html("Работа занята");
    //     }
    // });
}

export default useStatus;