export default function DullSpinner() {
  return (
    <div className='z-30 flex items-center justify-center'>
      <div
        className='text-warning relative z-0 h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
        role='status'
      />
    </div>
  )
}
