import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Cancel, Delete } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteData({ taskid }) {
  const [open, setOpen] = React.useState(false);
  const userid=sessionStorage.getItem('userId');
  const token=sessionStorage.getItem('token');
  const navigate=useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    setOpen(false);

    console.log(taskid,userid)
    axios.post("http://localhost:8000/delete",{taskid,userid},{
        headers:{'Authorization':token}
    }).then(
      (res)=>{
        if(res.data.success){
          navigate('/home');
          console.log(res.data.msg);
        }else if(res.data.status==487 || res.data.status==467) {
          navigate('/');
          alert("Please Log In");
        }
        else{
            alert('server error')
        }
        
      }
    )

  };

  return (
    <React.Fragment>
      <Button variant="outlined" size="small" startIcon={<Delete/>} color="error" onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete TODO"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are You Sure ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined"startIcon={<Cancel/>}>Cancel</Button>
          <Button onClick={handleDelete} variant="outlined"startIcon={<Delete/>}>Delete</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}