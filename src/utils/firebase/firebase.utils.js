// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

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
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters(
  {
    prompt: 'select_account'
  }
)

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt })
    } catch (e) {
      console.log('error creating the user', e)
    }
  }
}