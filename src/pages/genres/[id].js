import axios from 'axios'

export async function getServerSideProps(context) {
  const { id } = context.params

  const res = await axios(`http://localhost:4000/genresNoPagination/${id}`)
  const genre = res.data

  return {
    props: { genre }
  }
}

export default function Genre({ genre }) {
  return <></>
}
