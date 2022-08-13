import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

const Modal = ({ openDialog, setOpenDialog, Dialog, title, children, actions }) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Dialog
      fullScreen={fullScreen}
      open={openDialog}
      onClose={() => setOpenDialog(false)}
      aria-labelledby='responsive-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions className='dialog-actions-dense'>
        {actions}
      </DialogActions>
    </Dialog>
  )
}

export default Modal
