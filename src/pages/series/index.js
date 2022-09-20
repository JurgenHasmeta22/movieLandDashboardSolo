import axios from 'axios'
import Table from '../../components/Table'
import Button from '@mui/material/Button'
import { useState } from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined'
import { useRouter } from 'next/router'
import { getGridNumericOperators, getGridStringOperators } from '@mui/x-data-grid'

export async function getServerSideProps() {
  const url = `http://localhost:4000/series`
  const res = await axios(url)
  const series = res.data
  return {
    props: { series }
  }
}

const SeriesPage = ({ series }) => {
  const router = useRouter()

  function handleOpen(paramsRow) {
    router.push(`series/${paramsRow.id}`)
  }
  function handleEdit(paramsRow) {
    router.push(`serieEdit/${paramsRow.id}`)
  }

  const columns = [
    {
      flex: 0.1,
      minWidth: 50,
      field: 'id',
      headerName: 'Id',
      // renderHeader: (params) => (
      //   'Id'
      // ),
      extendType: 'number',
      description: 'The identification number of the serie',
      filterOperators: getGridNumericOperators().filter(
        operator => operator.value === '>' || operator.value === '<' || operator.value === '='
      )
    },
    {
      flex: 0.175,
      minWidth: 240,
      headerName: 'Title',
      // renderHeader: (params) => (
      //   'Title'
      // ),
      field: 'title',
      extendType: 'string',
      description: 'The title of the serie',
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
      minWidth: 240,
      headerName: 'Photo Source',
      // renderHeader: (params) => (
      //   'Photo source'
      // ),
      extendType: 'string',
      description: 'The source url of the image of the serie',
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
      field: 'ratingImdb',
      headerName: 'Rating Imdb',
      // renderHeader: (params) => (
      //   'Rating imdb'
      // ),
      description: 'The rating imdb that the movies has',
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
      // renderHeader: (params) => (
      //   'Release year'
      // ),
      description: 'The year that the movie is released',
      extendType: 'number',
      filterOperators: getGridNumericOperators().filter(
        operator => operator.value === '>' || operator.value === '<' || operator.value === '='
      )
    },
    {
      field: '',
      headerName: 'Actions',
      // renderHeader: (params) => (
      //   'Actions'
      // ),
      sortable: false,
      width: 200,
      disableClickEventBubbling: true,
      filterable: false,
      description: 'The actions of crud to do on this row, in this case edit and show the row in detail',
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

  const [seriesNew, setSeriesNew] = useState(series)

  return <Table title={'Series List'} rowsData={series} columnsData={columns} />
}

export default SeriesPage
