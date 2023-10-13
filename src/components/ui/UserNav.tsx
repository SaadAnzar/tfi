'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface Props {
  pic: string
  logout: () => void
}
const UserNav = ({ pic, logout }: Props) => {
  const [isChildVisible, setIsChildVisible] = useState(false)
  const router = useRouter()

  const toggleChildVisibility = () => {
    setIsChildVisible(!isChildVisible)
  }

  return (
    <div className="fixed top-0 z-20 flex h-16 w-full mb-10 bg-white shadow-xl px-5 py-2 md:px-20 md:py-4 justify-between">
      <h1 className="text-2xl font-bold tracking-tighter text-slate-900 sm:text-3xl">
        TFI Selection App Summary
      </h1>
      <div
        className="parent relative h-10 w-10 cursor-pointer rounded-full"
        onClick={toggleChildVisibility}
      >
        <Image
          src={pic}
          width={55}
          height={55}
          alt="Picture of the author"
          className="rounded-full ring-blue-600 hover:ring-2"
        />
        {isChildVisible && (
          <div className="child absolute right-0 top-16 h-fit w-fit rounded-md border-2  border-gray-200 bg-white px-6 py-2 shadow-md hover:bg-gray-100">
            <button onClick={logout} className="font-semibold">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserNav
