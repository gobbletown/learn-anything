import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetLink = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetLink), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const link = await db.link.findFirst({ where: { id } })

  if (!link) throw new NotFoundError()

  return link
})
