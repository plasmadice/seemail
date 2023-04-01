import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  const main = async () => {
    const pin: any = req?.query?.pin
    const screenshots: any = req?.query?.screenshots || false

    const url = `${process.env.ENTERPIN_URL}/?pin=${pin}&screenshots=${screenshots}`
    const result = await fetch(url, { cache: "no-store", headers: { cors: "no-cors" } })
    const data = await result.json()
    res.status(result.status).send(data)
  }
  
  return main().catch(console.log)
}
1