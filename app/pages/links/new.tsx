import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createLink from "app/links/mutations/createLink"
import { LinkForm, FORM_ERROR } from "app/links/components/LinkForm"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

const NewLinkPage: BlitzPage = () => {
  const router = useRouter()
  const [createLinkMutation] = useMutation(createLink)

  // const user = useCurrentUser()
  // console.log(user)

  return (
    <div className="m-auto w-1/2">
      <h1>Create New Link</h1>

      <LinkForm
        submitText="Create Link"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateLink}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            console.log(values)
            const link = await createLinkMutation(values)
            router.push(Routes.ShowLinkPage({ linkId: link.id }))
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.LinksPage()}>
          <a>Links</a>
        </Link>
      </p>
    </div>
  )
}

NewLinkPage.authenticate = true
NewLinkPage.getLayout = (page) => <Layout title={"Create New Link"}>{page}</Layout>

export default NewLinkPage
