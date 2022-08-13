import axios from 'axios'
import Table from '../../components/Table'
import Button from '@mui/material/Button'
import { useState } from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined'
import { useRouter } from 'next/router'

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
    router.push(`movies/${paramsRow.id}`)
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
      headerName: 'Title',
      field: 'title'
    },
    {
      flex: 0.175,
      minWidth: 110,
      field: 'videoSrc',
      headerName: 'Video Source'
    },
    {
      flex: 0.125,
      field: 'photoSrc',
      minWidth: 80,
      headerName: 'Photo Source'
    },
    {
      flex: 0.175,
      minWidth: 140,
      field: 'trailerSrc',
      headerName: 'Trailer Source'
    },
    {
      flex: 0.175,
      minWidth: 140,
      field: 'duration',
      headerName: 'Duration'
    },
    {
      flex: 0.175,
      minWidth: 140,
      field: 'ratingImdb',
      headerName: 'Rating Imdb'
    },
    {
      flex: 0.175,
      minWidth: 140,
      field: 'releaseYear',
      headerName: 'Release Year'
    },
    {
      flex: 0.175,
      minWidth: 140,
      field: 'description',
      headerName: 'Description'
    },
    {
      flex: 0.175,
      minWidth: 140,
      field: 'views',
      headerName: 'Views'
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

  const [moviesNew, setMoviesNew] = useState(movies)

  return <Table title={'Movies List'} rowsData={movies} columnsData={columns} />
}

export default MoviesPage
