import axios from 'axios'
import { Container } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export async function getServerSideProps(context) {
  const { id } = context.params
  const res = await axios(`http://localhost:4000/seriesNoPagination/${id}`)
  const serie = res.data
  return {
    props: { serie }
  }
}

export default function Serie({ serie }) {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Container
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', gap: '20px' }}
        >
          <Typography sx={{ ml: 2, lineHeight: 1, fontWeight: 500, fontSize: '1rem' }}>
            <strong>Series Id:</strong> {serie.id}
          </Typography>
          <Typography sx={{ ml: 2, fontWeight: 400, fontSize: '1rem' }}>
            <strong>Serie name:</strong> {serie.title}
          </Typography>
          <Typography sx={{ ml: 2, fontWeight: 400, fontSize: '1rem' }}>
            <strong>Serie photo source:</strong> {serie.photoSrc}
          </Typography>
          <Typography sx={{ ml: 2, fontWeight: 400, fontSize: '1rem' }}>
            <strong>Serie year of release:</strong> {serie.releaseYear}
          </Typography>
          <Typography sx={{ ml: 2, fontWeight: 400, fontSize: '1rem' }}>
            <strong>Serie rating:</strong> {serie.ratingImdb}
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
            {serie.episodes.length !== 0 && (
              <Typography sx={{ ml: 2, fontWeight: 900, fontSize: '1rem' }}>Serie episodes list:</Typography>
            )}
            {serie.episodes.map(episode => (
              <Typography sx={{ lineHeight: 1, fontWeight: 400, fontSize: '0.8rem' }}>{episode.title}</Typography>
            ))}
          </Container>
        </Container>
      </Box>
    </>
  )
}
