import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateLink = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateLink),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const link = await db.link.update({ where: { id }, data })

    return link
  }
)
