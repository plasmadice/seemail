import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  const main = async () => {
    console.log(`Hitting new endpoint`)

    // const pageUrl: any = process.env.SITE_URL
  
    const pin: any = req?.query?.pin
    const screenshots: any = req?.query?.screenshots || false

    console.log(`pin: ${pin}`)
    console.log(`screenshots: ${screenshots}`)

    const url = `${process.env.GCP_ENTERPIN_URL}/?pin=${pin}${screenshots ? '&screenshots=true' : ''}`
    console.log(`typeof url: ${typeof url}`)
    const result = await fetch(url, { cache: "no-store" })
    const data = await result.json()
    res.status(200).send(data)
  }
  
  // main() 
  return main().catch(console.log)
}
1