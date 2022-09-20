import * as React from 'react'
import { useState, useEffect } from 'react'
import Pagination from '@mui/material/Pagination'
import LinearProgress from '@mui/material/LinearProgress'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import axios from 'axios'
import Box from '@mui/material/Box'
import MuiDialog from '@mui/material/Dialog'
import Modal from '../components/Modal'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import {
  DataGrid,
  GridToolbar,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector
} from '@mui/x-data-grid'

const StyledGridOverlay = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  '& .ant-empty-img-1': {
    fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626'
  },
  '& .ant-empty-img-2': {
    fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959'
  },
  '& .ant-empty-img-3': {
    fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343'
  },
  '& .ant-empty-img-4': {
    fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c'
  },
  '& .ant-empty-img-5': {
    fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
    fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff'
  }
}))
function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg width='120' height='100' viewBox='0 0 184 152' aria-hidden focusable='false'>
        <g fill='none' fillRule='evenodd'>
          <g transform='translate(24 31.67)'>
            <ellipse className='ant-empty-img-5' cx='67.797' cy='106.89' rx='67.797' ry='12.668' />
            <path
              className='ant-empty-img-1'
              d='M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z'
            />
            <path
              className='ant-empty-img-2'
              d='M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z'
            />
            <path
              className='ant-empty-img-3'
              d='M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z'
            />
          </g>
          <path
            className='ant-empty-img-3'
            d='M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z'
          />
          <g className='ant-empty-img-4' transform='translate(149.65 15.383)'>
            <ellipse cx='20.654' cy='3.167' rx='2.849' ry='2.815' />
            <path d='M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z' />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>No Rows Found</Box>
    </StyledGridOverlay>
  )
}
function CustomPagination() {
  const apiRef = useGridApiContext()
  const page = useGridSelector(apiRef, gridPageSelector)
  const pageCount = useGridSelector(apiRef, gridPageCountSelector)

  return (
    <Pagination
      sx={{ mt: 15, mb: 15, display: 'flex', flexDirection: 'row', alignItems: 'center', placeItems: 'center' }}
      color='primary'
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  )
}
const Dialog = styled(MuiDialog)({
  '& .MuiBackdrop-root': {
    backdropFilter: 'blur(4px)'
  },
  '& .MuiDialog-paper': {
    overflow: 'hidden',
    '&:not(.MuiDialog-paperFullScreen)': {
      height: '100%',
      maxHeight: 550
    }
  }
})

const Table = ({ title, rowsData, columnsData }) => {
  const [tableName, setTableName] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [pageSize, setPageSize] = useState(20)
  const [page, setPage] = useState(0)
  const [selectedRows, setSelectedRows] = useState([])
  const [rowsToShow, setRowsToShow] = useState([])
  const [rowsCount, setRowsCount] = useState(0)
  const [sortModelField, setSortModelField] = useState(null)
  const [sortModelOrder, setSortModelOrder] = useState(null)
  const [searchedTerm, setSearchedTerm] = useState('')
  const [filterColumn, setFilterColumn] = useState({
    filterColumnName: null,
    filterColumnOperator: null,
    filterColumnValue: null
  })
  const [addUser, setAddUser] = useState({
    userName: '',
    email: '',
    password: ''
  })
  const [addSerie, setAddSerie] = useState({
    title: '',
    photoSrc: '',
    releaseYear: '',
    ratingImdb: ''
  })
  const [addEpisode, setAddEpisode] = useState({
    title: '',
    photoSrc: '',
    videoSrc: '',
    description: '',
    serieId: 1
  })
  const [addGenre, setAddGenre] = useState({
    name: ''
  })
  const [addMovie, setAddMovie] = useState({
    title: '',
    videoSrc: '',
    photoSrc: '',
    trailerSrc: '',
    duration: '',
    ratingImdb: '',
    releaseYear: '',
    description: ''
  })
  // const [openDialogEdit, setOpenDialogEdit] = useState(false)
  // const [fieldToCreate, setFieldsToCreate] = useState({})
  const [openDialogAdd, setOpenDialogAdd] = useState(false)

  useEffect(() => {
    if (title === 'Series List') setTableName('series')
    else if (title === 'Episodes List') setTableName('episodes')
    else if (title === 'Movies List') setTableName('movies')
    else if (title === 'Genres List') setTableName('genres')
    else if (title === 'Users List') setTableName('users')
    setIsLoading(true)
    getDataPaginated()
  }, [pageSize, page, tableName, sortModelField, sortModelOrder, searchedTerm, filterColumn])

  async function handleDeleteRow() {
    let res
    if (selectedRows.length !== 0 && tableName !== '') {
      for (const element of selectedRows) {
        res = await axios.delete(`http://localhost:4000/${tableName}/${element.id}`)
      }
      setRowsToShow(res.data.rows)
    }
  }
  async function handleAddGenre() {
    let res
    if (addGenre) {
      res = await axios.post(`http://localhost:4000/${tableName}`, addGenre)
      setRowsToShow(res.data)
    }
  }
  async function handleAddMovie() {
    let res
    if (addMovie) {
      res = await axios.post(`http://localhost:4000/${tableName}`, addMovie)
      setRowsToShow(res.data)
    }
  }
  async function handleAddSerie() {
    let res
    if (addSerie) {
      res = await axios.post(`http://localhost:4000/${tableName}`, addSerie)
      setRowsToShow(res.data)
    }
  }
  async function handleAddEpisode() {
    let res
    if (addEpisode) {
      res = await axios.post(`http://localhost:4000/${tableName}`, addEpisode)
      setRowsToShow(res.data)
    }
  }
  async function handleAddUser() {
    let res
    if (addUser.email !== '' && addUser.userName !== '' && addUser.password !== '') {
      res = await axios.post(`http://localhost:4000/${tableName}`, addUser)
      setRowsToShow(res.data)
    }
  }
  function openRow() {
    setOpenDialogAdd(true)
  }
  async function getDataPaginated() {
    const res = await axios.get(
      `http://localhost:4000/${tableName}/page/${page + 1}?perPage=${pageSize}${
        sortModelField && sortModelField !== undefined && sortModelField !== null ? `&sortBy=${sortModelField}` : ''
      }${
        sortModelOrder && sortModelOrder !== undefined && sortModelOrder !== null ? `&ascOrDesc=${sortModelOrder}` : ''
      }${
        searchedTerm &&
        (!filterColumn?.filterColumnValue ||
          filterColumn?.filterColumnValue === null ||
          filterColumn?.filterColumnValue === undefined)
          ? `&title=${searchedTerm}`
          : ''
      }${
        filterColumn?.filterColumnValue && filterColumn?.filterColumnValue !== null
          ? `&filterValue=${filterColumn?.filterColumnValue}`
          : ''
      }${
        filterColumn?.filterColumnName &&
        filterColumn?.filterColumnName !== null &&
        filterColumn?.filterColumnValue &&
        filterColumn?.filterColumnValue !== null
          ? `&filterName=${filterColumn?.filterColumnName}`
          : ''
      }${
        filterColumn?.filterColumnOperator &&
        filterColumn?.filterColumnOperator !== null &&
        filterColumn?.filterColumnValue &&
        filterColumn?.filterColumnValue !== null
          ? `&filterOperator=${filterColumn?.filterColumnOperator}`
          : ''
      }`
    )
    setRowsToShow(res.data.rows)
    setRowsCount(res.data.count)
    setIsLoading(false)
  }
  function handleSortModelChange(sortModel) {
    setSortModelField(sortModel[0]?.field)
    setSortModelOrder(sortModel[0]?.sort)
  }
  function handleFilterModelChange(filterModel) {
    setFilterColumn({
      filterColumnName: filterModel.items[0]?.columnField,
      filterColumnOperator: filterModel.items[0]?.operatorValue,
      filterColumnValue: filterModel.items[0]?.value
    })
    setSearchedTerm(filterModel.quickFilterValues[0])
  }

  return (
    <Card>
      <CardHeader title={title} sx={{ mb: 5, mt: 5, ml: 10 }} />
      <Button
        sx={{ border: 2, ml: 15 }}
        onClick={() => {
          openRow()
        }}
      >
        Add
        <AddOutlinedIcon />
      </Button>
      <Button
        sx={{ border: 2, ml: 10, bgcolor: '#ff5252' }}
        onClick={() => {
          handleDeleteRow()
        }}
      >
        Delete
        <ClearOutlinedIcon />
      </Button>
      <DataGrid
        autoHeight
        rows={rowsToShow}
        rowCount={rowsCount}
        columns={columnsData}
        onSelectionModelChange={ids => {
          const selectedRowsData = ids.map(id => rowsToShow.find(row => row.id === id))
          setSelectedRows(selectedRowsData)
        }}
        checkboxSelection
        sx={{ mt: 15, mb: 15 }}
        loading={isLoading}
        pagination
        paginationMode='server'
        rowsPerPageOptions={[5, 10, 15, 20, 25, 30, 35, 40, 50]}
        page={page}
        pageSize={pageSize}
        onPageChange={newPage => {
          setPage(newPage)
        }}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        sortingMode='server'
        onSortModelChange={sortModel => handleSortModelChange(sortModel)}
        filterMode='server'
        onFilterModelChange={filterModel => handleFilterModelChange(filterModel)}
        components={{
          Toolbar: GridToolbar,
          // Pagination: CustomPagination,
          NoRowsOverlay: CustomNoRowsOverlay
          // LoadingOverlay: LinearProgress
        }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 }
          }
        }}
      />
      <Modal
        openDialog={openDialogAdd}
        setOpenDialog={setOpenDialogAdd}
        Dialog={Dialog}
        title='Add a row'
        actions={
          <>
            {tableName === 'series' ? (
              <>
                <Button onClick={() => setOpenDialogAdd(false)}>Cancel & onClose</Button>
                <Button onClick={() => handleAddSerie()}>Confirm</Button>
              </>
            ) : tableName === 'movies' ? (
              <>
                <Button onClick={() => setOpenDialogAdd(false)}>Cancel & onClose</Button>
                <Button onClick={() => handleAddMovie()}>Confirm</Button>{' '}
              </>
            ) : tableName === 'users' ? (
              <>
                <Button onClick={() => setOpenDialogAdd(false)}>Cancel & onClose</Button>
                <Button onClick={() => handleAddUser()}>Confirm</Button>{' '}
              </>
            ) : tableName === 'genres' ? (
              <>
                <Button onClick={() => setOpenDialogAdd(false)}>Cancel & onClose</Button>
                <Button onClick={() => handleAddGenre()}>Confirm</Button>{' '}
              </>
            ) : tableName === 'episodes' ? (
              <>
                <Button onClick={() => setOpenDialogAdd(false)}>Cancel & onClose</Button>
                <Button onClick={() => handleAddEpisode()}>Confirm</Button>{' '}
              </>
            ) : null}
          </>
        }
      >
        {tableName === 'series' ? (
          <form
            noValidate
            autoComplete='off'
            onSubmit={e => {
              e.preventDefault()
              handleAddSerie()
            }}
          >
            <CardHeader title='Series Table' sx={{ mb: 2, mt: 2, ml: 5 }} />
            <FormControl noValidate autoComplete='off' fullWidth sx={{ mb: 2, mt: 2 }}>
              <InputLabel htmlFor='title-serie'>Title</InputLabel>
              <OutlinedInput
                label='Title'
                id='title-serie'
                type='text'
                onChange={e => setAddSerie({ ...addSerie, title: e.target.value })}
                rules={{ required: true }}
              />
            </FormControl>
            <FormControl noValidate autoComplete='off' fullWidth sx={{ mb: 2, mt: 2 }}>
              <InputLabel htmlFor='photosrc-serie'>Photo src</InputLabel>
              <OutlinedInput
                label='Photo src'
                id='photosrc-serie'
                type='text'
                onChange={e => setAddSerie({ ...addSerie, photoSrc: e.target.value })}
                rules={{ required: true }}
              />
            </FormControl>
            <FormControl noValidate autoComplete='off' fullWidth sx={{ mb: 2, mt: 2 }}>
              <InputLabel htmlFor='releaseyear-serie'>Release year</InputLabel>
              <OutlinedInput
                label='Release year'
                id='releaseyear'
                type='text'
                onChange={e => setAddSerie({ ...addSerie, releaseYear: Number(e.target.value) })}
                rules={{ required: true }}
              />
            </FormControl>
            <FormControl noValidate autoComplete='off' fullWidth sx={{ mb: 2, mt: 2 }}>
              <InputLabel htmlFor='ratingimdb-serie'>Rating imdb</InputLabel>
              <OutlinedInput
                label='Rating imdb'
                id='ratingimdb-serie'
                type='text'
                onChange={e => setAddSerie({ ...addSerie, ratingImdb: Number(e.target.value) })}
                rules={{ required: true }}
              />
            </FormControl>
          </form>
        ) : tableName === 'movies' ? (
          <form
            noValidate
            autoComplete='off'
            onSubmit={e => {
              e.preventDefault()
              handleAddMovie()
            }}
          >
            <CardHeader title='Movies Table' sx={{ mb: 2, mt: 2, ml: 5 }} />
            <FormControl noValidate autoComplete='off' fullWidth sx={{ mb: 2, mt: 2 }}>
              <InputLabel htmlFor='title-movie'>Title</InputLabel>
              <OutlinedInput
                label='Title'
                id='title-movie'
                type='text'
                onChange={e => setAddMovie({ ...addMovie, title: e.target.value })}
                rules={{ required: true }}
              />
            </FormControl>
            <FormControl noValidate autoComplete='off' fullWidth sx={{ mb: 2, mt: 2 }}>
              <InputLabel htmlFor='videosrc-movie'>Video src</InputLabel>
              <OutlinedInput
                label='Video src'
                id='videosrc-movie'
                type='text'
                onChange={e => setAddMovie({ ...addMovie, videoSrc: e.target.value })}
                rules={{ required: true }}
              />
            </FormControl>
            <FormControl noValidate autoComplete='off' fullWidth sx={{ mb: 2, mt: 2 }}>
              <InputLabel htmlFor='photosrc-movie'>Photo src</InputLabel>
              <OutlinedInput
                label='Photo src'
                id='photosrc-movie'
                type='text'
                onChange={e => setAddMovie({ ...addMovie, photoSrc: e.target.value })}
                rules={{ required: true }}
              />
            </FormControl>
            <FormControl noValidate autoComplete='off' fullWidth sx={{ mb: 2, mt: 2 }}>
              <InputLabel htmlFor='trailersrc-movie'>Trailer src</InputLabel>
              <OutlinedInput
                label='Trailer src'
                id='trailersrc-movie'
                type='text'
                onChange={e => setAddMovie({ ...addMovie, trailerSrc: e.target.value })}
                rules={{ required: true }}
              />
            </FormControl>
            <FormControl noValidate autoComplete='off' fullWidth sx={{ mb: 2, mt: 2 }}>
              <InputLabel htmlFor='releaseyear-movie'>Release year</InputLabel>
              <OutlinedInput
                label='Release year'
                id='releaseyear-movie'
                type='text'
                onChange={e => setAddMovie({ ...addMovie, releaseYear: Number(e.target.value) })}
                rules={{ required: true }}
              />
            </FormControl>
            <FormControl noValidate autoComplete='off' fullWidth sx={{ mb: 2, mt: 2 }}>
              <InputLabel htmlFor='ratingimdb-movie'>Rating imdb</InputLabel>
              <OutlinedInput
                label='Rating imdb'
                id='ratingimdb-movie'
                type='text'
                onChange={e => setAddMovie({ ...addMovie, ratingImdb: Number(e.target.value) })}
                rules={{ required: true }}
              />
            </FormControl>
            <FormControl noValidate autoComplete='off' fullWidth sx={{ mb: 2, mt: 2 }}>
              <InputLabel htmlFor='duration-movie'>Duration</InputLabel>
              <OutlinedInput
                label='Duration'
                id='duration-movie'
                type='text'
                onChange={e => setAddMovie({ ...addMovie, duration: Number(e.target.value) })}
                rules={{ required: true }}
              />
            </FormControl>
            <FormControl noValidate autoComplete='off' fullWidth sx={{ mb: 2, mt: 2 }}>
              <InputLabel htmlFor='description-movie'>Description</InputLabel>
              <OutlinedInput
                label='Description'
                id='description-movie'
                type='text'
                onChange={e => setAddMovie({ ...addMovie, description: e.target.value })}
                rules={{ required: true }}
              />
            </FormControl>
          </form>
        ) : tableName === 'episodes' ? (
          <form
            noValidate
            autoComplete='off'
            onSubmit={e => {
              e.preventDefault()
              handleAddEpisode()
            }}
          >
            <CardHeader title='Episodes Table' sx={{ mb: 2, mt: 2, ml: 5 }} />
            <FormControl noValidate autoComplete='off' fullWidth sx={{ mb: 2, mt: 2 }}>
              <InputLabel htmlFor='title-episode'>Title</InputLabel>
              <OutlinedInput
                label='Title'
                id='title-episode'
                type='text'
                onChange={e => setAddEpisode({ ...addEpisode, title: e.target.value })}
                rules={{ required: true }}
              />
            </FormControl>
            <FormControl noValidate autoComplete='off' fullWidth sx={{ mb: 2, mt: 2 }}>
              <InputLabel htmlFor='photosrc-episode'>Photo src</InputLabel>
              <OutlinedInput
                label='Photo src'
                id='photosrc-episode'
                type='text'
                onChange={e => setAddEpisode({ ...addEpisode, photoSrc: e.target.value })}
                rules={{ required: true }}
              />
            </FormControl>
            <FormControl noValidate autoComplete='off' fullWidth sx={{ mb: 2, mt: 2 }}>
              <InputLabel htmlFor='videosrc-episode'>Video src</InputLabel>
              <OutlinedInput
                label='Video src'
                id='videosrc-episode-episode'
                type='text'
                onChange={e => setAddEpisode({ ...addEpisode, videoSrc: e.target.value })}
                rules={{ required: true }}
              />
            </FormControl>
            <FormControl noValidate autoComplete='off' fullWidth sx={{ mb: 2, mt: 2 }}>
              <InputLabel htmlFor='description-episode'>Description</InputLabel>
              <OutlinedInput
                label='Description'
                id='description-episode'
                type='text'
                onChange={e => setAddEpisode({ ...addEpisode, description: e.target.value })}
                rules={{ required: true }}
              />
            </FormControl>
            <FormControl noValidate autoComplete='off' fullWidth sx={{ mb: 2, mt: 2 }}>
              <InputLabel htmlFor='serieid-episode'>Serie id</InputLabel>
              <OutlinedInput
                label='Serie Id'
                id='serieid-episode'
                type='text'
                onChange={e => setAddEpisode({ ...addEpisode, serieId: Number(e.target.value) })}
                rules={{ required: true }}
              />
            </FormControl>
          </form>
        ) : tableName === 'users' ? (
          <form
            noValidate
            autoComplete='off'
            onSubmit={e => {
              e.preventDefault()
              handleAddUser()
            }}
          >
            <CardHeader title='Users Table' sx={{ mb: 2, mt: 2, ml: 5 }} />
            <FormControl noValidate autoComplete='off' fullWidth sx={{ mb: 4, mt: 4 }}>
              <InputLabel htmlFor='username-user'>Name</InputLabel>
              <OutlinedInput
                label='Username'
                id='username-user'
                type='text'
                onChange={e => setAddUser({ ...addUser, userName: e.target.value })}
                rules={{ required: true }}
              />
            </FormControl>
            <FormControl noValidate autoComplete='off' fullWidth sx={{ mb: 4, mt: 4 }}>
              <InputLabel htmlFor='email-user'>Email</InputLabel>
              <OutlinedInput
                label='Email'
                id='email-user'
                type='text'
                onChange={e => setAddUser({ ...addUser, email: e.target.value })}
                rules={{ required: true }}
              />
            </FormControl>
            <FormControl noValidate autoComplete='off' fullWidth sx={{ mb: 4, mt: 4 }}>
              <InputLabel htmlFor='password-user'>Password</InputLabel>
              <OutlinedInput
                label='Password'
                id='password-user'
                type='text'
                onChange={e => setAddUser({ ...addUser, password: e.target.value })}
                rules={{ required: true }}
              />
            </FormControl>
          </form>
        ) : tableName === 'genres' ? (
          <form
            noValidate
            autoComplete='off'
            onSubmit={e => {
              e.preventDefault()
              handleAddGenre()
            }}
          >
            <CardHeader title='Genres Table' sx={{ mb: 2, mt: 2, ml: 5 }} />
            <FormControl noValidate autoComplete='off' fullWidth sx={{ mb: 4, mt: 4 }}>
              <InputLabel htmlFor='name-genre'>Name</InputLabel>
              <OutlinedInput
                label='Name'
                id='name-genre'
                type='text'
                onChange={e => setAddGenre({ ...addGenre, name: e.target.value })}
                rules={{ required: true }}
              />
            </FormControl>
          </form>
        ) : null}
      </Modal>
    </Card>
  )
}

export default Table
