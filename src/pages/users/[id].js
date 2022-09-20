import axios from 'axios'
import { Container } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export async function getServerSideProps(context) {
  const { id } = context.params
  const res = await axios(`http://localhost:4000/usersNoPagination/${id}`)
  const user = res.data
  return {
    props: { user }
  }
}

export default function Genre({ user }) {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Container
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', gap: '20px' }}
        >
          <Typography sx={{ ml: 2, lineHeight: 1, fontWeight: 500, fontSize: '1rem' }}>
            <strong>User Id:</strong> {user.id}
          </Typography>
          <Typography sx={{ ml: 2, fontWeight: 400, fontSize: '1rem' }}>
            <strong>Username:</strong> {user.userName}
          </Typography>
          <Typography sx={{ ml: 2, fontWeight: 400, fontSize: '1rem' }}>
            <strong>User email:</strong> {user.email}
          </Typography>
          <Typography sx={{ ml: 2, fontWeight: 400, fontSize: '1rem' }}>
            <strong>User password:</strong> {user.password}
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
            {user.favoriteMovies.length !== 0 && (
              <Typography sx={{ ml: 2, fontWeight: 900, fontSize: '1rem' }}>User favorite movies:</Typography>
            )}
            {user.favoriteMovies.map(movie => (
              <Typography sx={{ lineHeight: 1, fontWeight: 400, fontSize: '0.8rem' }}>{movie.movie.title}</Typography>
            ))}
          </Container>
        </Container>
      </Box>
    </>
  )
}
