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

  const columns = [
    {
      flex: 0.1,
      minWidth: 50,
      field: 'id',
      headerName: 'Id',
      extendType: 'number',
      filterOperators: getGridNumericOperators().filter(
        operator => operator.value === 'gt' || operator.value === 'lt' || operator.value === 'equals'      )
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
      field: 'ratingImdb',
      headerName: 'Rating Imdb',
      extendType: 'number',
      filterOperators: getGridNumericOperators().filter(
        operator => operator.value === 'gt' || operator.value === 'lt' || operator.value === 'equals'      )
    },
    {
      flex: 0.175,
      minWidth: 140,
      field: 'releaseYear',
      headerName: 'Release Year',
      extendType: 'number',
      filterOperators: getGridNumericOperators().filter(
        operator => operator.value === 'gt' || operator.value === 'lt' || operator.value === 'equals'      )
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
          <Button onClick={() => {}}>
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
