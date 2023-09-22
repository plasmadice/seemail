// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ImapFlow } from "imapflow"
import { NextResponse } from "next/server"

export const revalidate = 0

export async function GET(request: Request) {
  const client = new ImapFlow({
    host: process.env.HOST as string,
    port: process.env.PORT as unknown as number,
    secure: true,
    auth: {
      user: process.env.AUTH_USER as string,
      pass: process.env.AUTH_PASS,
    },
    logger: false,
  })

  let data = { code: "123456", date: "2021-08-01T00:00:00.000Z" }

  const main = async () => {
    // Wait until client connects and authorizes
    await client.connect()

    // // Select and lock a mailbox. Throws if mailbox does not exist
    let lock = await client.getMailboxLock("INBOX")

    try {
      let list = await client.search({ subject: process.env.DEFAULT_SEARCH })

      let lastMsg: any = list[list.length - 1]

      let msg = await client.fetchOne(lastMsg, { envelope: true, source: true })
      const indexOfBold = msg.source.toString().indexOf("bold;'")
      let rest = msg.source.toString().slice(indexOfBold + 7)
      const code = rest.split("</p>")[0]
      const date: any = msg.envelope.date
      data = { code, date }
    } finally {
      // Make sure lock is released, otherwise next `getMailboxLock()` never returns
      lock.release()
    }

    await client.logout()
  }

  await main()
  return NextResponse.json(data)
}
