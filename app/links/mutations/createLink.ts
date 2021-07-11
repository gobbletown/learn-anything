import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateLink = z.object({
  title: z.string(),
  url: z.string(),
})

export default resolver.pipe(resolver.zod(CreateLink), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const link = await db.link.create({ data: input })

  return link
})
