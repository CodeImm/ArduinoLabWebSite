import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import firebaseConfig from "./config";

const firebaseApp = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();
export const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export async function signInWithEmailAndPassword(email, password, rememberMe) {
     await firebase.auth().setPersistence(rememberMe ? firebase.auth.Auth.Persistence.LOCAL: firebase.auth.Auth.Persistence.SESSION).then(()=>{
        return firebase.auth().signInWithEmailAndPassword(email, password);
    })
    // window.location.reload();
}

export async function createUserWithEmailAndPassword(fname, lname, faculty, group, email, password) {
    console.log(email + " " + fname + " " + lname);
    return await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(registeredUser => {
            db.collection('usersCollection').doc(registeredUser.user.uid)
                .set({
                    firstName: fname,
                    lastName: lname,
                    facultyInfo: {...faculty},
                    groupInfo: {...group}
                })
        });
    // window.location.reload();
}

export async function resetPassword(emailAddress) {
    return auth.sendPasswordResetEmail(emailAddress);
    // window.location.reload();
}

export function checkAuth(cb) {
    return auth.onAuthStateChanged(cb);
}

export async function logOut() {
    await auth.signOut();
    // window.location.reload();
}