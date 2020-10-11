import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: 'AIzaSyAR5lKnHi2Jh7FnLTP4Bs5J_nXx9XLsS-0',
    authDomain: 'phys-labs.firebaseapp.com',
    databaseURL: 'https://phys-labs.firebaseio.com',
    projectId: 'phys-labs',
    storageBucket: 'phys-labs.appspot.com',
    messagingSenderId: '260360388138',
    appId: '1:260360388138:web:b5af7c2d58c6913d5f4d53'
};

const firebaseApp = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();
// firebase.auth.Auth.Persistence.LOCAL;
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider)
    // window.location.reload();
}

export function checkAuth(cb) {
    return auth.onAuthStateChanged(cb);
}

export async function logOut() {
    await auth.signOut();
    // window.location.reload();
}