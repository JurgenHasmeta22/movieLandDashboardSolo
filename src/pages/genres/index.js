import axios from "axios"
import Table from "../../components/Table"
import Button from "@mui/material/Button"
import { useState } from "react"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined"
import { useRouter } from "next/router"
import { getGridNumericOperators, getGridStringOperators } from "@mui/x-data-grid"

export async function getServerSideProps() {
    const url = `http://localhost:4000/genres`
    const res = await axios(url)
    const genres = res.data
    return {
        props: { genres }
    }
}

const GenresPage = ({ genres }) => {
    const router = useRouter()

    function handleOpen(paramsRow) {
        router.push(`genres/${paramsRow.id}`)
    }
    function handleEdit(paramsRow) {
        router.push(`genreEdit/${paramsRow.id}`)
    }

    const columns = [
        {
            flex: 0.25,
            minWidth: 150,
            field: "id",
            headerName: "Id",
            // renderHeader: (params) => (
            //   'Id'
            // ),
            extendType: "number",
            description: "The identification number of the genre",
            filterOperators: getGridNumericOperators().filter(
                operator => operator.value === ">" || operator.value === "<" || operator.value === "="
            )
        },
        {
            flex: 0.175,
            minWidth: 550,
            headerName: "Type",
            // renderHeader: (params) => (
            //   'Type'
            // ),
            field: "name",
            extendType: "string",
            description: "The type of the genres, so category of it",
            filterOperators: getGridStringOperators().filter(
                operator =>
                    operator.value === "contains" ||
                    operator.value === "equals" ||
                    operator.value === "startsWith" ||
                    operator.value === "endsWith"
            )
        },
        {
            field: "",
            headerName: "Actions",
            // renderHeader: (params) => (
            //   'Actions'
            // ),
            description: "The actions of crud to do on this row, in this case edit and show the row in detail",
            sortable: false,
            width: 180,
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

    const [genresNew, setGenresNew] = useState(genres)

    return <Table title={"Genres List"} rowsData={genres} columnsData={columns} />
}

export default GenresPage
