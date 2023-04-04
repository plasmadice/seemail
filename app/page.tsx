'use client'
import Link from 'next/link'
import PinForm from './pin/pinForm'
import Footer from './components/Footer'

export default function Home() {
  return (
    <div className='m-auto flex max-h-screen flex-col bg-inherit'>
      <div className=' flex h-auto w-fit flex-col place-content-start items-center rounded-b bg-rhino text-center'>
        <Link
          className='pt-4 font-mono text-base text-white hover:underline'
          href='/code'
          prefetch={false}
        >
          {'>'}Retrieve newest code from email{'<'}
        </Link>
        <PinForm />
        <Footer />
      </div>
    </div>
  )
}
