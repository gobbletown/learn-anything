import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteLink = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteLink), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const link = await db.link.deleteMany({ where: { id } })

  return link
})
