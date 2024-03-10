import axios from "axios"
import { Container } from "@mui/material"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

export async function getServerSideProps(context) {
    const { id } = context.params

    const res = await axios(`http://localhost:4000/genresNoPagination/${id}`)
    const genre = res.data
    return {
        props: { genre }
    }
}

export default function Genre({ genre }) {
    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Container
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                        justifyContent: "start",
                        gap: "20px"
                    }}
                >
                    <Typography sx={{ ml: 2, lineHeight: 1, fontWeight: 500, fontSize: "1rem" }}>
                        <strong>Genre Id:</strong> {genre.id}
                    </Typography>
                    <Typography sx={{ ml: 2, fontWeight: 400, fontSize: "1rem" }}>
                        <strong>Genre name:</strong> {genre.name}
                    </Typography>
                    <Container
                        sx={{
                            ml: -2,
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px",
                            mt: "50px",
                            alignItems: "start",
                            justifyContent: "start"
                        }}
                    >
                        {genre.movies.length !== 0 && (
                            <Typography sx={{ ml: 2, fontWeight: 900, fontSize: "1rem" }}>
                                Movies with this genre:
                            </Typography>
                        )}
                        {genre.movies.map(movie => (
                            <Typography sx={{ lineHeight: 1, fontWeight: 400, fontSize: "0.8rem" }}>
                                {movie.movie.title}
                            </Typography>
                        ))}
                    </Container>
                </Container>
            </Box>
        </>
    )
}
