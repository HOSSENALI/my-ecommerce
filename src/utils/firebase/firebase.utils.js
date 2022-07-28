// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, getDocs, setDoc, collection, writeBatch, query } from 'firebase/firestore'

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

//adding data to firebase database
export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd
) => {
    const batch = writeBatch(db);
    const collectionRef = collection(db, collectionKey);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');
};
//getting shop data from firebase database..............
export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});

    return categoryMap;
};

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {

    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    // console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    //console.log(userSnapshot);
    //console.log(userSnapshot.exists());
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
// creating user to database..............
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}
// sign-in function..............
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

//function for signout
export const signOutUser = async () => await signOut(auth);

//to track login or logout user
export const onAuthStateChangedListener = (callback) =>
    onAuthStateChanged(auth, callback);