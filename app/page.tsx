import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1>Some content</h1>
      <h4>More content </h4>
      <Link href="/code">Retrieve code from email</Link>
      <br />
      <p>(unfinished)PIN LOGIN</p> 
      <a target="_blank" href="https://github.com/plasmadice/seemail">Link to github repo</a>
    </div>
  );
}
