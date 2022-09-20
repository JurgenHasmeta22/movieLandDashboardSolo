import axios from 'axios'
import { Container } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export async function getServerSideProps(context) {
  const { id } = context.params
  const res = await axios(`http://localhost:4000/episodesNoPagination/${id}`)
  const episode = res.data
  // {
  //   id: 1,
  //   title: 'r3r3rr',
  //   photoSrc: '3r3r3r',
  //   videoSrc: 'r33r3r',
  //   description: 'r33r',
  //   serieId: 1,
  //   serie: {
  //     id: 1,
  //     title: '3r3r3r',
  //     photoSrc: '3r3r3r',
  //     releaseYear: 222,
  //     ratingImdb: 2
  //   }
  // }
  return {
    props: { episode }
  }
}

export default function Episode({ episode }) {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Container
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', gap: '20px' }}
        >
          <Typography sx={{ ml: 2, lineHeight: 1, fontWeight: 500, fontSize: '1rem' }}>
            <strong>Episode Id:</strong> {episode.id}
          </Typography>
          <Typography sx={{ ml: 2, fontWeight: 400, fontSize: '1rem' }}>
            <strong>Episode Title:</strong> {episode.title}
          </Typography>
          <Typography sx={{ ml: 2, fontWeight: 400, fontSize: '1rem' }}>
            <strong>Episode photo source:</strong> {episode.photoSrc}
          </Typography>
          <Typography sx={{ ml: 2, fontWeight: 400, fontSize: '1rem' }}>
            <strong>Episode description:</strong> {episode.description}
          </Typography>
          <Container
            sx={{
              ml: -2,
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              mt: '50px',
              alignItems: 'start',
              justifyContent: 'start'
            }}
          >
            {episode.serie && (
              <Typography sx={{ ml: 2, fontWeight: 900, fontSize: '1rem' }}>Serie of this episode:</Typography>
            )}
            {/* {user.favoriteMovies.map(movie => (
              <Typography sx={{ lineHeight: 1, fontWeight: 400, fontSize: '0.8rem' }}>{movie.movie.title}</Typography>
            ))} */}
          </Container>
        </Container>
      </Box>
    </>
  )
}
