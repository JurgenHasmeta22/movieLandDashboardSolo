import axios from "axios"

export async function getServerSideProps(context) {
  const { id } = context.params

  const res = await axios(`http://localhost:4000/usersNoPagination/${id}`)
  const user = res.data

  return {
    props: { user }
  }
}

export default function Genre({ user }) {
  return <></>
}
