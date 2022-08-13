import axios from 'axios'

export async function getServerSideProps(context) {
  const { id } = context.params

  const res = await axios(`http://localhost:4000/episodesNoPagination/${id}`)
  const episode = res.data

  return {
    props: { episode }
  }
}

export default function Episode({ episode }) {
  return (
    <>
      {/* {Object.keys(episode).map((key, index) => {
        return (
          <div key={index}>
            <span>
              {key}: {episode[key]}
            </span>

            <hr />
          </div>
        )
      })}

      <br />
      <br />
      <br /> */}

      {/* 👇️ iterate object VALUES */}
      {/* {Object.values(episode).map((value, index) => {
        return (
          <div key={index}>
            <span>{value}</span>
            <hr />
          </div>
        )
      })} */}
    </>
  )
}
