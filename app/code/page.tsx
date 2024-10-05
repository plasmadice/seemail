export const dynamic = 'force-dynamic'

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
    <div className="mockup-phone border-primary">
      <div className="camera"></div>
      <div className="display">
        <div className="artboard artboard-demo phone-1">
          {" "}
          <div className="text-base-content content-center m-auto">
            <p className="text-2xl font-semibold">{code.code}</p>
            <p className="text-sm italic">Sent: {code.date}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
