const { ImapFlow } = require("imapflow")
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const client = new ImapFlow({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.AUTH_USER,
      pass: process.env.APP_PASS,
    },
    logger: false,
  })

  let status, data = {}

  const main = async () => {
    // Wait until client connects and authorizes
    await client.connect()

    // Select and lock a mailbox. Throws if mailbox does not exist
    let lock = await client.getMailboxLock("INBOX")

    try {
      let list = await client.search({ subject: process.env.DEFAULT_SEARCH })

      let lastMsg = list[list.length - 1]

      let msg = await client.fetchOne(lastMsg, { envelope: true, source: true })
      const indexOfBold = msg.source.toString().indexOf("bold;'")
      let rest = msg.source.toString().slice(indexOfBold + 7)
      const code = rest.split("</p>")[0]
      const date = msg.envelope.date

      status = 200
      data = { code, date }
    } catch (e) {
      console.log(e)
      status = 500
      data = { error: e }
    } finally {
      // Make sure lock is released, otherwise next `getMailboxLock()` never returns
      lock.release()
    }
  }

  await main()
  await client.logout()
  return NextResponse.json(data, { status })
}
