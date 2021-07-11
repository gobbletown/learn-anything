import { Suspense } from "react"
import {
  Head,
  Link as BlitzLink,
  useRouter,
  useQuery,
  useParam,
  BlitzPage,
  useMutation,
  Routes,
} from "blitz"
import Layout from "app/core/layouts/Layout"
import getLink from "app/links/queries/getLink"
import deleteLink from "app/links/mutations/deleteLink"

export const Link = () => {
  const router = useRouter()
  const linkId = useParam("linkId", "number")
  const [deleteLinkMutation] = useMutation(deleteLink)
  const [link] = useQuery(getLink, { id: linkId })

  return (
    <>
      <Head>
        <title>Link {link.id}</title>
      </Head>

      <div>
        <h1>Link {link.id}</h1>
        <pre>{JSON.stringify(link, null, 2)}</pre>

        <BlitzLink href={Routes.EditLinkPage({ linkId: link.id })}>
          <a>Edit</a>
        </BlitzLink>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteLinkMutation({ id: link.id })
              router.push(Routes.LinksPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowLinkPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <BlitzLink href={Routes.LinksPage()}>
          <a>Links</a>
        </BlitzLink>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Link />
      </Suspense>
    </div>
  )
}

ShowLinkPage.authenticate = true
ShowLinkPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowLinkPage
