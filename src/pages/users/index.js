import axios from 'axios'
import Table from '../../components/Table'
import Button from '@mui/material/Button'
import { useState } from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined'
import { useRouter } from 'next/router'

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

  const columns = [
    {
      flex: 0.1,
      minWidth: 50,
      field: 'id',
      headerName: 'Id'
    },
    {
      flex: 0.175,
      minWidth: 120,
      headerName: 'Username',
      field: 'userName'
    },
    {
      flex: 0.125,
      field: 'email',
      minWidth: 80,
      headerName: 'Email'
    },
    {
      flex: 0.175,
      minWidth: 140,
      field: 'password',
      headerName: 'Password'
    },
    {
      field: '',
      headerName: 'Actions',
      sortable: false,
      width: 200,
      disableClickEventBubbling: true,
      renderCell: params => (
        <>
          <Button
            onClick={() => {
              console.log(params.row)
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

  return <Table title={'Users List'} rowsData={users} columnsData={columns} />
}

export default UsersPage
