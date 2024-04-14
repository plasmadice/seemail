'use client'
import { useState, useEffect } from 'react'

export default function Spinner({ duration = 90 }) {
  const [count, setCount] = useState(duration)

  useEffect(() => {
    const countId = setInterval(() => {
      setCount((prev: number) => prev - 1)
    }, 1000)

    return () => clearInterval(countId)
  }, [])

  return (
    <div className='z-30 grid grid-cols-1 justify-items-center'>
      <div
        className='text-warning absolute z-30 h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
        role='status'
      />

      <p className='relative flex h-10 w-10 items-center justify-center text-base-content'>
        {count > 0 ? count : 0}
      </p>
      <p className='relative z-30 h-8 items-center justify-center font-medium text-base-content'>
        30-90 seconds later...
      </p>
    </div>
  )
}
