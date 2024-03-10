import axios from "axios"
import Table from "../../components/Table"
import Button from "@mui/material/Button"
import { useState } from "react"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined"
import { useRouter } from "next/router"
import { getGridNumericOperators, getGridStringOperators } from "@mui/x-data-grid"

export async function getServerSideProps() {
    const url = `http://localhost:4000/users`
    const res = await axios(url)
    const users = res.data
    return {
        props: { users }
    }
}

const UsersPage = ({ users }) => {
    const router = useRouter()

    function handleOpen(paramsRow) {
        router.push(`users/${paramsRow.id}`)
    }
    function handleEdit(paramsRow) {
        router.push(`userEdit/${paramsRow.id}`)
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
            description: "The number of identification of the user",
            extendType: "number",
            filterOperators: getGridNumericOperators().filter(
                operator => operator.value === ">" || operator.value === "<" || operator.value === "="
            )
        },
        {
            flex: 0.175,
            minWidth: 120,
            headerName: "Username",
            // renderHeader: (params) => (
            //   'Username'
            // ),
            field: "userName",
            description: "The username of the user",
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
            flex: 0.125,
            field: "email",
            minWidth: 80,
            headerName: "Email",
            // renderHeader: (params) => (
            //   'Email'
            // ),
            extendType: "string",
            description: "The email of the user",
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
            field: "password",
            headerName: "Password",
            // renderHeader: (params) => (
            //   'Password'
            // ),
            extendType: "string",
            description: "The password of the user",
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
            sortable: false,
            width: 200,
            disableClickEventBubbling: true,
            filterable: false,
            description: "The actions of crud to do on this row, in this case edit and show the row in detail",
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

    const [usersNew, setUsersNew] = useState(users)

    return <Table title={"Users List"} rowsData={users} columnsData={columns} />
}

export default UsersPage
