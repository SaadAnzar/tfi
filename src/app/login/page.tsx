import { Metadata } from 'next'

import { UserAuthForm } from '@//components/UserAuthForm'

export const metadata: Metadata = {
  title: 'TFI Selection Copilot | Login',
  description: 'Login page for Teach For India Selection app',
}

export default function LoginPage() {
  return (
    <>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            TFI ORG
          </div>
          <div className="relative z-20 mt-16 text-lg">
            <h1 className="text-[21px] font-medium">
              The Teach For India Fellowship is an empowering movement to
              revolutionise education in India.
            </h1>

            <h2 className="py-8 text-zinc-400">
              As a Fellow, you gain invaluable teaching and leadership skills,
              join a vast network of like-minded educators, mentors, alumni who
              become influential change agents and advocates for educational
              equity, social progress.
            </h2>

            <h2 className="text-zinc-400">
              Foster lifelong connections and collaborations, gain unique
              perspectives and create lasting impact.
            </h2>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-base">
                &ldquo;The Fellowship is definitely the hardest thing I have
                ever done. But it also put me on a pathway that has completely
                and irrevocably changed my life in the best possible way.&rdquo;
              </p>
              <footer className="text-sm">~ Sruti Sriram</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Teach For India Selection Copilot
              </h1>
              <p className="text-sm text-muted-foreground">
                Powered by Polymath AI
              </p>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
  )
}
