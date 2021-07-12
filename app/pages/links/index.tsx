import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getLinks from "app/links/queries/getLinks"
import { Button, ButtonGroup } from "@chakra-ui/react"

const ITEMS_PER_PAGE = 100

export const LinksList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ links }] = usePaginatedQuery(getLinks, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  return (
    <div>
      <ul>
        {links.map((link) => (
          <li key={link.id}>
            <a href={link.url}>{link.title}</a>
            <span className="text-gray-500"> - {link.url} </span>
            <Button>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

const LinksPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Links</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewLinkPage()}>
            <a>Create Link</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <LinksList />
        </Suspense>
      </div>
    </>
  )
}

LinksPage.authenticate = true
LinksPage.getLayout = (page) => <Layout>{page}</Layout>

export default LinksPage
