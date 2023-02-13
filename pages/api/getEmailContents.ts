// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const { ImapFlow } = require('imapflow');

const messages: any = [];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const client = new ImapFlow({
    host: process.env.HOST,
    port: process.env.PORT,
    secure: true,
    auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASS
    },
    logger: false
  });
  
  const main = async () => {
    // Wait until client connects and authorizes
    await client.connect()
  
    // // Select and lock a mailbox. Throws if mailbox does not exist
    let lock = await client.getMailboxLock('INBOX');

    try {
      let list = await client.search({subject: process.env.DEFAULT_SEARCH});
      let code = "error"

        let lastMsg = list[list.length - 1]
        // console.log(lastMsg)

        let msg = await client.fetchOne(lastMsg, {envelope: true, source: true})
        const indexOfBold = msg.source.toString().indexOf("bold;'")
        let rest = msg.source.toString().slice(indexOfBold + 7)
        code = rest.split('</p>')[0]
        
        res.status(200).json({ code })
    } finally {
        // Make sure lock is released, otherwise next `getMailboxLock()` never returns
        lock.release()
    }

    await client.logout()

  };
  
  // main() 
  return main().catch(err => console.error(err));
}
