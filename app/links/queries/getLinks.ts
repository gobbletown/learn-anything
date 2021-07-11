import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetLinksInput
  extends Pick<Prisma.LinkFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetLinksInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: links,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.link.count({ where }),
      query: (paginateArgs) => db.link.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      links,
      nextPage,
      hasMore,
      count,
    }
  }
)
