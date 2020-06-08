// Configuration
var config = {
  apiKey: 'AIzaSyAR5lKnHi2Jh7FnLTP4Bs5J_nXx9XLsS-0',
  authDomain: 'phys-labs.firebaseapp.com',
  databaseURL: 'https://phys-labs.firebaseio.com',
  projectId: 'phys-labs',
  storageBucket: 'phys-labs.appspot.com',
  messagingSenderId: '260360388138',
  appId: '1:260360388138:web:b5af7c2d58c6913d5f4d53'
}

// Firebase Initialize
firebase.initializeApp(config);

firebase.auth.Auth.Persistence.LOCAL;