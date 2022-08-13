import axios from "axios"

export async function getServerSideProps(context) {
    const { id } = context.params
    
    const res = await axios(`http://localhost:4000/moviesNoPagination/${id}`)
    const movie = res.data
  
    return {
      props: { movie }
    }
  }
  
  export default function Movie({ movie }) {
    return <></>
  }
  