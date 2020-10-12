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
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export async function signInWithEmailAndPassword(email, password, rememberMe) {
     await firebase.auth().setPersistence(rememberMe ? firebase.auth.Auth.Persistence.LOCAL: firebase.auth.Auth.Persistence.SESSION).then(()=>{
        return firebase.auth().signInWithEmailAndPassword(email, password);
    })
    // window.location.reload();
}

export async function createUserWithEmailAndPassword(email, password, firstName, lastName, faculty, group) {
    return await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(registeredUser => {
            db.collection('usersCollection')
                .add({
                    uid: registeredUser.user.uid,
                    firstName: firstName,
                    lastName: lastName,
                    facultyId: faculty.id,
                    groupId: group.id
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