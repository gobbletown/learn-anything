import getUsers from "app/users/getUsers"
import { LinksList } from "./links"

const User = ({ username }) => {
  return (
    <div>
      <h1>Links of {username}</h1>
      <LinksList />
    </div>
  )
}

// only pre render pages for usernames that exist
export async function getStaticPaths() {
  const users = await getUsers()
  const paths = users.map((user) => ({
    params: { username: user.username },
  }))
  return { paths, fallback: false }
}

// get username & the username's links
export async function getStaticProps({ params }) {
  const username = params.username
  return { props: { username }, revalidate: 1 }
}

export default User
