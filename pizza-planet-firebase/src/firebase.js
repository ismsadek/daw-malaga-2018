import Firebase from 'firebase'

/**
 * Pega aquí los datos de tu proyecto firebase
 */
const firebaseApp = Firebase.initializeApp({
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
});

export const db = firebaseApp.database()
export const storage = firebaseApp.storage()
export const auth = firebaseApp.auth()