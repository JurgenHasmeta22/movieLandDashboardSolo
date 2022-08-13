import axios from 'axios'
import Table from '../../components/Table'
import Button from '@mui/material/Button'
import { useState } from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import { useRouter } from 'next/router'

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
  
  const columns = [
    {
      flex: 0.25,
      minWidth: 290,
      field: 'id',
      headerName: 'Id'
    },
    {
      flex: 0.175,
      minWidth: 120,
      headerName: 'Type',
      field: 'name'
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

  const [genresNew, setGenresNew] = useState(genres)

  return <Table title={'Genres List'} rowsData={genres} columnsData={columns} />
}

export default GenresPage
