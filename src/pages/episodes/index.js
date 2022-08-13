import axios from 'axios'
import Table from '../../components/Table'
import Button from '@mui/material/Button'
import { useState } from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import { useRouter } from 'next/router'

export async function getServerSideProps() {
  const url = `http://localhost:4000/episodes`

  const res = await axios(url)
  const episodes = res.data

  return {
    props: { episodes }
  }
}

const EpisodesPage = ({ episodes }) => {
  const router = useRouter()

  function handleOpen(paramsRow) {
    router.push(`episodes/${paramsRow.id}`)
  }

  const columns = [
    {
      flex: 0.15,
      minWidth: 50,
      field: 'id',
      headerName: 'Id'
    },
    {
      flex: 0.175,
      minWidth: 100,
      headerName: 'Title',
      field: 'title'
    },
    {
      flex: 0.175,
      minWidth: 100,
      field: 'photoSrc',
      headerName: 'Image Source'
    },
    {
      flex: 0.125,
      field: 'videoSrc',
      minWidth: 100,
      headerName: 'Video Source'
    },
    {
      flex: 0.175,
      minWidth: 50,
      field: 'serieId',
      headerName: 'Serie Id'
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

  const [episodesNew, setEpisodesNew] = useState(episodes)

  return <Table title={'Episodes List'} rowsData={episodes} columnsData={columns} />
}

export default EpisodesPage
