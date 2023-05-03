import type { NextApiRequest, NextApiResponse } from "next"

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const pin: any = req?.query?.pin
  const screenshots: any = req?.query?.screenshots || false

  const url = `${process.env.ENTERPIN_URL}/?pin=${pin}&screenshots=${screenshots}`
  const result = await fetch(url, { cache: "no-store" })
  const data = await result.json()
  return res.status(result.status).send(data)
}
