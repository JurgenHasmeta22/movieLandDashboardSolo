import axios from "axios"
import Table from "../../components/Table"
import Button from "@mui/material/Button"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined"
import { useRouter } from "next/router"
import { getGridNumericOperators, getGridStringOperators } from "@mui/x-data-grid"

export async function getServerSideProps() {
    const url = `http://localhost:4000/movies`
    const res = await axios(url)
    const movies = res.data
    return {
        props: { movies }
    }
}

const MoviesPage = ({ movies }) => {
    const router = useRouter()

    function handleOpen(paramsRow) {
        router.push(
            {
                pathname: `movies/${paramsRow.id}`,
                query: paramsRow
            },
            `movies/${paramsRow.id}`
        )
    }

    function handleEdit(paramsRow) {
        router.push(`movieEdit/${paramsRow.id}`)
    }

    const columns = [
        {
            flex: 0.1,
            minWidth: 50,
            field: "id",
            headerName: "Id",
            // renderHeader: (params) => (
            //   'Id'
            // ),
            extendType: "number",
            description: "The identification number of the movie",
            filterOperators: getGridNumericOperators().filter(
                operator => operator.value === ">" || operator.value === "<" || operator.value === "="
            )
        },
        {
            flex: 0.175,
            minWidth: 240,
            headerName: "Title",
            // renderHeader: (params) => (
            //   'Title'
            // ),
            field: "title",
            extendType: "string",
            description: "The title of the movie",
            filterOperators: getGridStringOperators().filter(
                operator =>
                    operator.value === "contains" ||
                    operator.value === "equals" ||
                    operator.value === "startsWith" ||
                    operator.value === "endsWith"
            )
        },
        {
            flex: 0.175,
            minWidth: 240,
            field: "videoSrc",
            headerName: "Video Source",
            // renderHeader: (params) => (
            //   'Video source'
            // ),
            extendType: "string",
            description: "The source url of the movie",
            filterOperators: getGridStringOperators().filter(
                operator =>
                    operator.value === "contains" ||
                    operator.value === "equals" ||
                    operator.value === "startsWith" ||
                    operator.value === "endsWith"
            )
        },
        {
            flex: 0.125,
            field: "photoSrc",
            minWidth: 240,
            headerName: "Photo Source",
            // renderHeader: (params) => (
            //   'Photo source'
            // ),
            description: "The url source of the image that the movie has",
            extendType: "string",
            filterOperators: getGridStringOperators().filter(
                operator =>
                    operator.value === "contains" ||
                    operator.value === "equals" ||
                    operator.value === "startsWith" ||
                    operator.value === "endsWith"
            )
        },
        {
            flex: 0.175,
            minWidth: 240,
            field: "trailerSrc",
            headerName: "Trailer Source",
            // renderHeader: (params) => (
            //   'Trailer source'
            // ),
            extendType: "string",
            description: "The url source of the trailer youtube that the movie has",
            filterOperators: getGridStringOperators().filter(
                operator =>
                    operator.value === "contains" ||
                    operator.value === "equals" ||
                    operator.value === "startsWith" ||
                    operator.value === "endsWith"
            )
        },
        {
            flex: 0.175,
            minWidth: 140,
            field: "duration",
            headerName: "Duration",
            // renderHeader: (params) => (
            //   'Duration'
            // ),
            extendType: "number",
            description: "The duration in minutes that the movie has",
            filterOperators: getGridNumericOperators().filter(
                operator => operator.value === ">" || operator.value === "<" || operator.value === "="
            )
        },
        {
            flex: 0.175,
            minWidth: 140,
            field: "ratingImdb",
            headerName: "Rating Imdb",
            // renderHeader: (params) => (
            //   'Rating imdb'
            // ),
            extendType: "number",
            description: "The rating imdb that the movies has",
            filterOperators: getGridNumericOperators().filter(
                operator => operator.value === ">" || operator.value === "<" || operator.value === "="
            )
        },
        {
            flex: 0.175,
            minWidth: 140,
            field: "releaseYear",
            headerName: "Release Year",
            // renderHeader: (params) => (
            //   'Release year'
            // ),
            extendType: "number",
            description: "The year that the movie is released",
            filterOperators: getGridNumericOperators().filter(
                operator => operator.value === ">" || operator.value === "<" || operator.value === "="
            )
        },
        {
            flex: 0.175,
            minWidth: 240,
            field: "description",
            headerName: "Description",
            // renderHeader: (params) => (
            //   'Description'
            // ),
            extendType: "string",
            description: "The description of the movie",
            filterOperators: getGridStringOperators().filter(
                operator =>
                    operator.value === "contains" ||
                    operator.value === "equals" ||
                    operator.value === "startsWith" ||
                    operator.value === "endsWith"
            )
        },
        {
            flex: 0.175,
            minWidth: 140,
            field: "views",
            headerName: "Views",
            // renderHeader: (params) => (
            //   'Views'
            // ),
            extendType: "number",
            description: "The number of views that the movie has",
            filterOperators: getGridNumericOperators().filter(
                operator => operator.value === ">" || operator.value === "<" || operator.value === "="
            )
        },
        {
            field: "",
            headerName: "Actions",
            // renderHeader: (params) => (
            //   'Actions'
            // ),
            sortable: false,
            width: 240,
            description: "The actions of crud to do on this row, in this case edit and show the row in detail",
            disableClickEventBubbling: true,
            filterable: false,
            renderCell: params => (
                <>
                    <Button
                        onClick={() => {
                            handleEdit(params.row)
                        }}
                    >
                        <EditOutlinedIcon />
                    </Button>
                    <Button
                        onClick={() => {
                            handleOpen(params.row)
                        }}
                    >
                        <OpenInNewOutlinedIcon />
                    </Button>
                </>
            )
        }
    ]

    return <Table title={"Movies List"} rowsData={movies} columnsData={columns} />
}

export default MoviesPage
