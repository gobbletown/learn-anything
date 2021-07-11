import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateLink = z.object({
  title: z.string(),
  url: z.string(),
})

export default resolver.pipe(resolver.zod(CreateLink), resolver.authorize(), async (input, ctx) => {
  const userId = ctx.session.userId

  const link = await db.link.create({
    data: {
      ...input,
      user: {
        connect: { id: userId },
      },
    },
  })

  return link
})
