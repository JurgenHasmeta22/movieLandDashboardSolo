import axios from 'axios'

export async function getServerSideProps(context) {
  const { id } = context.params

  const res = await axios(`http://localhost:4000/seriesNoPagination/${id}`)
  const serie = res.data

  return {
    props: { serie }
  }
}

export default function Serie({ serie }) {
  return <></>
}
