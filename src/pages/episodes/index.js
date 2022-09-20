import axios from 'axios'
import Table from '../../components/Table'
import Button from '@mui/material/Button'
// import { useState } from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined'
import { useRouter } from 'next/router'
import { getGridNumericOperators, getGridStringOperators } from '@mui/x-data-grid'

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
  function handleEdit(paramsRow) {
    router.push(`episodeEdit/${paramsRow.id}`)
  }

  const columns = [
    {
      flex: 0.15,
      minWidth: 30,
      field: 'id',
      headerName: 'Id',
      // renderHeader: (params) => (
      //     'Id'
      // ),
      description: 'The identification number of the episode',
      extendType: 'number',
      filterOperators: getGridNumericOperators().filter(
        operator => operator.value === '>' || operator.value === '<' || operator.value === '='
      )
    },
    {
      flex: 0.175,
      minWidth: 120,
      // renderHeader: (params) => (
      //   'Title'
      // ),
      headerName: 'Title',
      field: 'title',
      description: 'The title of the episode',
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
      minWidth: 200,
      // renderHeader: (params) => (
      //   'Photo source'
      // ),
      field: 'photoSrc',
      headerName: 'Image Source',
      description: 'The url source of the image that the movie has',
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
      field: 'videoSrc',
      minWidth: 200,
      // renderHeader: (params) => (
      //   'Video source'
      // ),
      headerName: 'Video Source',
      description: 'The url source of the video that the movie has',
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
      minWidth: 30,
      field: 'serieId',
      // renderHeader: (params) => (
      //   'Serie id'
      // ),
      headerName: 'Serie Id',
      description: 'The serie number of identification that this episode belongs to',
      extendType: 'number',
      filterOperators: getGridNumericOperators().filter(
        operator => operator.value === '>' || operator.value === '<' || operator.value === '='
      )
    },
    {
      field: '',
      // renderHeader: (params) => (
      //   'Actions'
      // ),
      headerName: 'Actions',
      sortable: false,
      description: 'The actions of crud to do on this row, in this case edit and show the row in detail',
      width: 150,
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

  return <Table title={'Episodes List'} rowsData={episodes} columnsData={columns} />
}

export default EpisodesPage
