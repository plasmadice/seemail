import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Some content</p>
      <Link href="/code">Retrieve code from email</Link>

    </div>
  );
}
