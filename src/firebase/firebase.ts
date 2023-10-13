import { initializeApp } from "firebase/app"
import {
  getAuth,
  GoogleAuthProvider,
  sendSignInLinkToEmail,
  signInWithPopup,
  signOut,
} from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { toast } from "sonner"

import firebaseConfig2 from "./firebaseConfig2"

//password protection firebase
const app2 = initializeApp(firebaseConfig2, "app2")
const db2 = getFirestore(app2)

//login

const auth = getAuth(app2)

const googleProvider = new GoogleAuthProvider()

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider)
    console.log("yesss")
    console.log(res)
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
    window.localStorage.setItem("emailForSignIn", email)
    toast.success("Email sent successfully")
  } catch (error: any) {
    const errorCode = error.code
    const errorMessage = error.message
    console.error(errorCode, errorMessage)
  }
}
///login

export { app2, db2, signInWithGoogle, registerWithEmail }

// export { db, app, analytics }
