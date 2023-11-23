'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

import { FaGoogle } from 'react-icons/fa'

import { XCircle, AlertCircle, CheckCircle2 } from 'lucide-react'

import LoadingDots from '@/components/LoadingDots'
import { db, signInWithGoogle } from '@/firebase/firebase'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { collection, getDocs } from 'firebase/firestore'
import Cookies from 'js-cookie'
import { FaCheck } from 'react-icons/fa'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type AccessStatusProps = 'granted' | 'denied' | 'error'

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [accessStatus, setAccessStatus] = useState<AccessStatusProps>()
  const [emails, setEmails] = useState<any[]>([])

  const [pageLoading, setPageLoading] = useState<boolean>(false)

  const router = useRouter()

  const fetchEmails = async () => {
    const emailsRef = collection(db, 'allowed_emails')
    const snapshot = await getDocs(emailsRef)

    const emails: any = []

    snapshot.forEach((doc) => {
      emails.push(doc.data().email)
    })

    setEmails(emails)
  }

  useEffect(() => {
    setPageLoading(true)
    const check = Cookies.get('isLoggedIn')
    if (check == 'true') {
      router.push('/')
    }

    fetchEmails()
    setPageLoading(false)
  }, [])

  const loginWithGoogle = async () => {
    setPageLoading(true)
    try {
      if (emails.length == 0 || null || undefined) {
        fetchEmails()
      }

      const res: any = await signInWithGoogle()

      if (res.user) {
        const user = res.user
        const email = user.email
        const userData: any = {
          uid: user.uid,
          name: user.displayName,
          authProvider: 'google',
          email: user.email,
        }

        localStorage.setItem('users', JSON.stringify(user))

        if (emails.includes(userData.email)) {
          Cookies.set('isLoggedIn', 'true')
          setAccessStatus('granted')
          setPageLoading(false)
          router.push('/')
        } else {
          setAccessStatus('denied')
          setPageLoading(false)
        }
      } else {
        setPageLoading(false)

        console.error('Google Sign-In failed or User Information is missing')
      }
    } catch (error) {
      setPageLoading(false)

      console.error('An error occurred during Google Sign-In:', error)

      setAccessStatus('error')
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Please Login to access this website.
          </span>
        </div>
      </div>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <Button
          variant="outline"
          type="button"
          // disabled={pageLoading}
          onClick={loginWithGoogle}
        >
          {pageLoading ? (
            <LoadingDots color="black" style="small" />
          ) : (
            <>
              <FaGoogle className="mr-2 h-4 w-4" /> Google
            </>
          )}
        </Button>
        <div>
          {accessStatus === 'granted' && (
            <h1 className="text-center">
              <span className="text-green-500 inline-flex justify-center items-center">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Access has been granted.
              </span>
              <br />
              <span className="text-muted-foreground text-sm">
                Please go ahead and explore!
              </span>
            </h1>
          )}
        </div>
        <div>
          {accessStatus === 'denied' && (
            <h1 className="text-center">
              <span className="text-red-500 inline-flex justify-center items-center">
                <XCircle className="w-4 h-4 mr-2" />
                You do not have permission to login.
              </span>
              <br />
              <span className="text-muted-foreground text-sm">
                Please try with different Google account!
              </span>
            </h1>
          )}
        </div>
        <div>
          {accessStatus === 'error' && (
            <h1 className="text-center">
              <span className="text-yellow-600 inline-flex justify-center items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                An error occurred during Google login.
              </span>
              <br />
              <span className="text-muted-foreground text-sm">
                Please try again!
              </span>
            </h1>
          )}
        </div>
      </div>
    </div>
  )
}
