async function getCode() {
  const url = `${process.env.NEXT_PUBLIC_URL}/api/getEmailContents`

  const res = await fetch(url, { cache: "no-store" })
  const data = await res.json()

  data.date = new Date(data?.date).toLocaleString("en-US")

  return data
}

export default async function page() {
  const code = await getCode()
  return (
    <div>
      <p className="text-2xl font-semibold">{code.code}</p>
      <p className="text-sm italic">Sent: {code.date}</p>
    </div>
  )
}
