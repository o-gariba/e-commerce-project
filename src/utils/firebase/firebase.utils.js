// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2R6rfn8bfF4cgKRE_eSVf9MO4Efot7ps",
  authDomain: "crown-ecommerce-ztm.firebaseapp.com",
  projectId: "crown-ecommerce-ztm",
  storageBucket: "crown-ecommerce-ztm.appspot.com",
  messagingSenderId: "686567381876",
  appId: "1:686567381876:web:42eaa9f533263ccb512a21"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters(
  {
    prompt: 'select_account'
  }
)

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
  if (!userAuth) throw new Error('User not found');

  const userDocRef = doc(db, 'users', userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInfo })
    } catch (e) {
      console.log('error creating the user', e)
    }
  }
}

export const createAuthUserFromEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    throw new Error('You must provide an email and password')
  }
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    throw new Error('You must provide an email and password')
  }
  return await signInWithEmailAndPassword(auth, email, password)
}