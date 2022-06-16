// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAvcE7EQozwOP1H9CGwzmIPNNt-8STT8cE",
    authDomain: "my-ecommerce-b0dd8.firebaseapp.com",
    projectId: "my-ecommerce-b0dd8",
    storageBucket: "my-ecommerce-b0dd8.appspot.com",
    messagingSenderId: "576378124915",
    appId: "1:576378124915:web:9cb4dd769dfa09518e8806"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account",
})

export const auth = getAuth();

//sign up ..................
export const signInWithGooglePopup = () => (
    signInWithPopup(auth, provider)
);

//saving user to firebase database..........................................
const db = getFirestore(); //creating instance of firebase database

export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {

    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    // console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    //console.log(userSnapshot);
    console.log(userSnapshot.exists());
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createAt = new Date();

        try {
            await setDoc(userDocRef, { displayName, email, createAt, ...additionalInformation });
        } catch (error) {
            console.log("error from ", error.message);
        }
    }
    return userDocRef;

}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}