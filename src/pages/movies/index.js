import axios from 'axios'
import Table from '../../components/Table'
import Button from '@mui/material/Button'
import { useState } from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined'
import { useRouter } from 'next/router'
import { getGridNumericOperators, getGridStringOperators } from '@mui/x-data-grid'

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
  // const [moviesNew, setMoviesNew] = useState(movies)

  const columns = [
    {
      flex: 0.1,
      minWidth: 50,
      field: 'id',
      headerName: 'Id',
      extendType: 'number',
      filterOperators: getGridNumericOperators().filter(
        operator => operator.value === '>' || operator.value === '<' || operator.value === '='
      )
    },
    {
      flex: 0.175,
      minWidth: 120,
      headerName: 'Title',
      field: 'title',
      extendType: 'string',
      filterOperators: getGridStringOperators().filter(
        operator =>
          operator.value === 'contains' ||
          operator.value === 'equals' ||
          operator.value === 'startsWith' ||
          operator.value === 'endsWith'
      )
    },
    {
      flex: 0.175,
      minWidth: 110,
      field: 'videoSrc',
      headerName: 'Video Source',
      extendType: 'string',
      filterOperators: getGridStringOperators().filter(
        operator =>
          operator.value === 'contains' ||
          operator.value === 'equals' ||
          operator.value === 'startsWith' ||
          operator.value === 'endsWith'
      )
    },
    {
      flex: 0.125,
      field: 'photoSrc',
      minWidth: 80,
      headerName: 'Photo Source',
      extendType: 'string',
      filterOperators: getGridStringOperators().filter(
        operator =>
          operator.value === 'contains' ||
          operator.value === 'equals' ||
          operator.value === 'startsWith' ||
          operator.value === 'endsWith'
      )
    },
    {
      flex: 0.175,
      minWidth: 140,
      field: 'trailerSrc',
      headerName: 'Trailer Source',
      extendType: 'string',
      filterOperators: getGridStringOperators().filter(
        operator =>
          operator.value === 'contains' ||
          operator.value === 'equals' ||
          operator.value === 'startsWith' ||
          operator.value === 'endsWith'
      )
    },
    {
      flex: 0.175,
      minWidth: 140,
      field: 'duration',
      headerName: 'Duration',
      extendType: 'number',
      filterOperators: getGridNumericOperators().filter(
        operator => operator.value === '>' || operator.value === '<' || operator.value === '='
      )
    },
    {
      flex: 0.175,
      minWidth: 140,
      field: 'ratingImdb',
      headerName: 'Rating Imdb',
      extendType: 'number',
      filterOperators: getGridNumericOperators().filter(
        operator => operator.value === '>' || operator.value === '<' || operator.value === '='
      )
    },
    {
      flex: 0.175,
      minWidth: 140,
      field: 'releaseYear',
      headerName: 'Release Year',
      extendType: 'number',
      filterOperators: getGridNumericOperators().filter(
        operator => operator.value === '>' || operator.value === '<' || operator.value === '='
      )
    },
    {
      flex: 0.175,
      minWidth: 140,
      field: 'description',
      headerName: 'Description',
      extendType: 'string',
      filterOperators: getGridStringOperators().filter(
        operator =>
          operator.value === 'contains' ||
          operator.value === 'equals' ||
          operator.value === 'startsWith' ||
          operator.value === 'endsWith'
      )
    },
    {
      flex: 0.175,
      minWidth: 140,
      field: 'views',
      headerName: 'Views',
      extendType: 'number',
      filterOperators: getGridNumericOperators().filter(
        operator => operator.value === '>' || operator.value === '<' || operator.value === '='
      )
    },
    {
      field: '',
      headerName: 'Actions',
      sortable: false,
      width: 200,
      disableClickEventBubbling: true,
      filterable: false,
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

  function handleOpen(paramsRow) {
    router.push({
      pathname: `movies/${paramsRow.id}`,
      query: paramsRow
    }, `movies/${paramsRow.id}`)
  }

  return <Table title={'Movies List'} rowsData={movies} columnsData={columns} />
}

export default MoviesPage
