import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  sendSignInLinkToEmail,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { toast } from 'sonner'

import firebaseConfig from './firebaseConfig'

const app = initializeApp(firebaseConfig, 'app')
const db = getFirestore(app)

const auth = getAuth(app)

const googleProvider = new GoogleAuthProvider()

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider)
    return res
  } catch (err) {
    console.error(err)
  }
}
const registerWithEmail = async (email: string) => {
  try {
    const actionCodeSettings = {
      url: `https://build.trypolymath.ai/dashboard?email=${email}`,
      handleCodeInApp: true,
    }
    await sendSignInLinkToEmail(auth, email, actionCodeSettings)
    window.localStorage.setItem('emailForSignIn', email)
    toast.success('Email sent successfully')
  } catch (error: any) {
    const errorCode = error.code
    const errorMessage = error.message
    console.error(errorCode, errorMessage)
  }
}

export { app, db, signInWithGoogle, registerWithEmail }
