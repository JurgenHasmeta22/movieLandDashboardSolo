import axios from "axios"
import { useRouter } from "next/router"
import { Container } from "@mui/material"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

export async function getServerSideProps(context) {
    const { id } = context.params
    const res = await axios(`http://localhost:4000/moviesNoPagination/${id}`)
    const movie = res.data

    return {
        props: { movie }
    }
}

export default function Movie({ movie }) {
    const router = useRouter()
    const paramsRow = router.query
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
                    <Typography sx={{ ml: 2, lineHeight: 1, fontWeight: 500, fontSize: "1rem !important" }}>
                        <strong>Id:</strong> {movie.id}
                    </Typography>
                    <Typography sx={{ ml: 2, fontWeight: 400, fontSize: "1rem" }}>
                        <strong>Movie title:</strong> {movie.title}
                    </Typography>
                    <Typography sx={{ ml: 2, fontWeight: 400, fontSize: "1rem" }}>
                        <strong>Movie video source:</strong> {movie.videoSrc}
                    </Typography>
                    <Typography sx={{ ml: 2, fontWeight: 400, fontSize: "1rem" }}>
                        <strong>Movie photo source:</strong> {movie.photoSrc}
                    </Typography>
                    <Typography sx={{ ml: 2, fontWeight: 400, fontSize: "1rem" }}>
                        <strong>Movie duration:</strong> {movie.duration}
                    </Typography>
                    <Typography sx={{ ml: 2, fontWeight: 400, fontSize: "1rem" }}>
                        <strong>Movie year of release:</strong> {movie.releaseYear}
                    </Typography>
                    <Typography sx={{ ml: 2, fontWeight: 400, fontSize: "1rem" }}>
                        <strong>Movie views:</strong> {movie.views}
                    </Typography>
                    <Container
                        sx={{
                            ml: -2,
                            display: "flex",
                            flexDirection: "row",
                            gap: "20px",
                            mt: "50px",
                            alignItems: "start",
                            justifyContent: "start"
                        }}
                    >
                        {movie.genres.length !== 0 && (
                            <Typography sx={{ ml: 2, lineHeight: 1, fontWeight: 900, fontSize: "1rem" }}>
                                Movie genres:
                            </Typography>
                        )}
                        {movie.genres.map(genre => (
                            <Typography sx={{ lineHeight: 1, fontWeight: 500, fontSize: "1rem !important" }}>
                                {genre.genre.name}
                            </Typography>
                        ))}
                    </Container>
                </Container>
            </Box>
        </>
    )
}
