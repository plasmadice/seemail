import { VscGithubAlt } from 'react-icons/vsc'

export default function Footer() {
  return (
    <div className='min-h-16 absolute bottom-0 grid w-screen grid-cols-2 grid-rows-1 bg-base-300 py-2 text-center'>
      <div className='m-auto'>
        <a
          className='font-mono text-base text-base-content hover:underline'
          target='_blank'
          rel='noreferrer'
          href='https://github.com/plasmadice/seemail'
        >
          {<VscGithubAlt className='m-auto' />}
          Link to GitHub repo
        </a>
      </div>
      <a
        className='m-auto text-2xl font-medium text-base-content hover:underline'
        target='_blank'
        rel='noreferrer'
        href='https://hwhite.dev/portfolio'
      >
        more by me ;)
      </a>
    </div>
  )
}
