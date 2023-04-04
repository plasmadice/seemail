export default function DullSpinner() {
  return (
    <div className='flex justify-center items-center z-30'>
      <div
        className='h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-warning relative z-0'
        role='status'
      />
    </div>
  )
}
