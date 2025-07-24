import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import NavItems from './NavItems'
import { SignInButton,SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from './ui/button'

const Navbar = () => {
  return (
    <nav className='navbar'>
        <Link href="/">
            <div className='flex items-center gap-2.5 cursor-pointer'>
                <Image src="/images/logo.png" alt="logo" width={40} height={40} />
            </div>
        </Link>
        <div className='flex items-center gap-8'>
            <NavItems/>
            <SignedOut>
              
              <SignInButton><button className='btn-signin'>Sign In</button></SignInButton>
              
            </SignedOut>
            <SignedIn>
              <UserButton/>
            </SignedIn>
            
        </div>
    </nav>
  )
}

export default Navbar
