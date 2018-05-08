import Firebase from 'firebase'

 
const firebaseApp = Firebase.initializeApp({
 
    apiKey: "AIzaSyB4xcsTn3mPlWJ8LaVtuFngEDmlCgyg864",
    authDomain: "pizza-planet-fire.firebaseapp.com",
    databaseURL: "https://pizza-planet-fire.firebaseio.com",
    projectId: "pizza-planet-fire",
    storageBucket: "pizza-planet-fire.appspot.com",
    messagingSenderId: "811674737979"
  
 });

export const db = firebaseApp.database()
export const storage = firebaseApp.storage()
export const auth = firebaseApp.auth()