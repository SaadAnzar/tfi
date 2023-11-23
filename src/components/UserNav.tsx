import React from 'react'
import Image from 'next/image'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Props {
  pic: string
  displayName: String
  email: String
  initials: String
  logout: () => void
}
const UserNav = ({ pic, logout, displayName, email, initials }: Props) => {
  return (
    <div className="fixed top-0 z-20 flex h-16 w-full mb-10 bg-white shadow-xl px-5 py-2 md:px-20 md:py-4 justify-between items-center">
      <h1 className="text-lg font-[650] tracking-tighter text-slate-900 sm:text-3xl inline-flex justify-center items-center">
        <Image
          src="/logo.svg"
          alt="logo"
          height={200}
          width={200}
          className="mr-3"
          priority={true}
        />
        Selection Copilot
      </h1>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={pic} alt="user" />
              <AvatarFallback>
                {displayName ? `${initials}` : 'TFI'}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{displayName}</p>
              <p className="text-muted-foreground text-xs leading-none">
                {email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default UserNav
