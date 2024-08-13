
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='flex flex-col items-center justify-center'>

        <h1 className='text-5xl font-bold'>Web Based Wallet</h1>
        <div className='max-w-[500px] mx-auto '>

        <p className='text-center mt-3 text-black/80'>Create a pneumonic, add multiple wallets and see the public key associated with each wallet.</p>
        </div>
        <Link href="/wallet">
        
        <Button className='mt-5'>
          Get started now
        </Button>
        </Link>
      </div>
    </div>
  )
}

export default Home