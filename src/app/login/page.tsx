'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import LoadingDots from '@/components/LoadingDots'
import { db2, registerWithEmail, signInWithGoogle } from '@/firebase/firebase'

import { collection, getDocs } from 'firebase/firestore'
import Cookies from 'js-cookie'
import { FaCheck } from 'react-icons/fa'

//login handler
const Login = () => {
  const [accessStatus, setAccessStatus] = useState('loading')
  const [emails, setEmails] = useState<any[]>([])

  const [pageLoading, setPageLoading] = useState<boolean>(false)

  const router = useRouter()

  const fetchEmails = async () => {
    const emailsRef = collection(db2, 'allowed_emails')
    const snapshot = await getDocs(emailsRef)

    const emailss: any = []

    snapshot.forEach((doc) => {
      emailss.push(doc.data().email)
    })

    setEmails(emailss)
  }

  useEffect(() => {
    setPageLoading(true)
    const check = Cookies.get('isLoggedIn')
    if (check == 'true') {
      router.push('/')
    }

    fetchEmails()
    console.log(emails)
    setPageLoading(false)
    // fetchAllowedEmails();
  }, [])
  useEffect(() => {
    console.log(emails)
  }, [emails])

  const login = async () => {
    console.log(emails)

    setPageLoading(true)
    // setAccessStatus('allowed');
    try {
      if (emails.length == 0 || null || undefined) {
        console.log('nooo emails')
        fetchEmails()
      }

      const res: any = await signInWithGoogle()
      console.log(res)

      if (res.user) {
        const user = res.user
        const email = user.email
        const userData: any = {
          uid: user.uid,
          name: user.displayName,
          authProvider: 'google',
          email: user.email,
        }

        console.log(userData)

        localStorage.setItem('users', JSON.stringify(user))

        if (emails.includes(userData.email)) {
          Cookies.set('isLoggedIn', 'true')
          setAccessStatus('allowed')

          router.push('/')
          setPageLoading(false)
        } else {
          setAccessStatus('denied')
          setPageLoading(false)
        }
      } else {
        setPageLoading(false)

        // Handle the case when res.user is undefined or null
        console.error('Google Sign-In failed or user information is missing')
        // You can handle this case as appropriate for your application
      }
    } catch (error) {
      setPageLoading(false)

      console.error('An error occurred during Google Sign-In:', error)
      // Handle the error here, show an error message, or perform other actions
      setAccessStatus('error')
    }
  }

  // const login = async () => {

  //   // setAccessStatus('allowed');
  //   try {
  //     const res: any = await signInWithGoogle()
  //     setPageLoading(true)
  //     console.log(res.user.photoURL)

  //     if (res.user) {
  //       const user = res.user
  //       const email = user.email
  //       const userData: any = {
  //         uid: user.uid,
  //         name: user.displayName,
  //         authProvider: "google",
  //         email: user.email,
  //         pic: res.user.photoURL,
  //       }

  //       console.log(userData)
  //       localStorage.setItem("user", JSON.stringify(userData))

  //       const userRef = await doc(db2, "users", userData.uid)

  //       const docSnap = await getDoc(userRef)

  //       if (!docSnap.exists()) {
  //         // User does not exist, create and store
  //         await setDoc(doc(db2, "users", user.uid), userData)
  //         router.push("./")
  //         localStorage.setItem("user", JSON.stringify(userData))
  //       } else {
  //         router.push("./")
  //         localStorage.setItem("user", JSON.stringify(userData))
  //       }
  //     } else {
  //       // Handle the case when res.user is undefined or null
  //       console.error("Google Sign-In failed or user information is missing")
  //       // You can handle this case as appropriate for your application
  //     }
  //   } catch (error) {
  //     console.error("An error occurred during Google Sign-In:", error)
  //     // Handle the error here, show an error message, or perform other actions
  //     setAccessStatus("error")
  //   } finally {
  //     setPageLoading(false)
  //   }
  // }
  // const searchParams = useSearchParams()
  // const params = searchParams?.get("email")
  // const [email, setEmail] = useState(params ? params : "")
  // async function register() {
  //   if (email === "") {
  //     return toast.error("Please enter an email address")
  //   } else {
  //     await registerWithEmail(email)
  //   }
  // }
  // useEffect(() => {
  //   const userJSON = localStorage.getItem("users")

  //   let user

  //   if (userJSON) {
  //     // User does exist, parse it
  //     console.log("hello" + userJSON)

  //     router.push("./")
  //     user = JSON.parse(userJSON)
  //   } else {
  //     // User does not exist
  //     user = null
  //   }
  //   console.log(user)

  //   if (!user) {
  //     console.log("nooooooo")
  //   }
  // }, [])

  return (
    <div
      className="flex min-h-screen w-screen items-center justify-center bg-white/90  text-center  text-black"
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex h-2/3 w-full flex-col justify-center gap-8 rounded-md border border-black/5 px-5  py-10 shadow-lg md:h-3/6  md:px-12 lg:w-3/6 ">
        <div className=" flex flex-col items-center gap-2">
          <div className="flex gap-3">
            {/* <Image
              src="/tapas.png"
              width={200}
              height={200}
              alt="Logo"
              className="h-auto w-48"
              priority
              unoptimized
            />
            <Image
              src="/PNG.png"
              width={200}
              height={200}
              alt="Logo"
              className="h-auto w-48"
              priority
              unoptimized
            /> */}
          </div>

          <h1 className="text-2xl font-bold">
            Teach For India Selection Copilot
          </h1>
          <p className="font-medium">Powered by Polymath AI</p>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-2">
          <button
            onClick={login}
            className="flex w-4/6 items-center justify-center gap-x-3 rounded-lg border py-2.5 duration-150 hover:bg-gray-50 active:bg-gray-100"
          >
            {accessStatus == 'allowed' ? (
              <>
                {' '}
                <FaCheck className="mb-2 h-7 w-7 text-green-500" /> Access
                Granted!{' '}
              </>
            ) : (
              <>
                {pageLoading ? (
                  <div className=" px-">
                    <LoadingDots color="black" style="large" />
                  </div>
                ) : (
                  <>
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_17_40)">
                        <path
                          d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                          fill="#4285F4"
                        />
                        <path
                          d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                          fill="#34A853"
                        />
                        <path
                          d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                          fill="#FBBC04"
                        />
                        <path
                          d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                          fill="#EA4335"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_17_40">
                          <rect width="48" height="48" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    Continue with Google{' '}
                  </>
                )}
              </>
            )}

            {/* {pageLoading ? (
              <div className=" h-7 w-7 animate-spin rounded-full border-2 border-r-red-500 "></div>
            ) : (
              <>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_17_40)">
                    <path
                      d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                      fill="#34A853"
                    />
                    <path
                      d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                      fill="#FBBC04"
                    />
                    <path
                      d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                      fill="#EA4335"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_17_40">
                      <rect width="48" height="48" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Continue with Google{" "}
              </>
            )}
          </button> */}
          </button>

          {/* <h1 className="mt-1 text-lg font-normal">
            {pageLoading ? (
              <LoadingDots color="black" style="large" />
            ) : (
              <></>
            )}
          </h1> */}

          {/* <div className='text-green-500'>{allowedEmails}</div> */}
          {accessStatus === 'denied' ? (
            <div>
              <h1 className="text-lg font-normal text-red-600 ">
                You do not have permission
              </h1>
            </div>
          ) : (
            <div>
              <h1 className="text-lg font-normal  ">
                Please Log-in to access this website.
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
