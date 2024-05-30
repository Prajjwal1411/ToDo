import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Cancel, Send } from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

export default function EditForm({ taskid}) {
  const [open, setOpen] = React.useState(false);
  const [taskName,setTaskName]=React.useState('');
  const [taskDescription,setTaskDescription]=React.useState('');
  const [priority,setPriority]=React.useState('');
  const [status,setStatus]=React.useState('');
  const [dueDate,setDueDate]=React.useState(dayjs());
  const userid=sessionStorage.getItem('userId');
  const token=sessionStorage.getItem('token');
  const navigate=useNavigate();

  const changeTaskName = (e) => {
    setTaskName(e.target.value);
  }

  const changeTaskDescription = (e) => {
    setTaskDescription(e.target.value);
  }

  const changePriority = (e) => {
    setPriority(e.target.value);
  }

  const changeStatus = (e) => {
    setStatus(e.target.value);
  }

  const changeTaskDue = (date) => {
    setDueDate(date);
  }


  const handleClickOpen = () => {
    setOpen(true);
    axios.post("http://localhost:8000/gettask", { taskid, userid },{
      headers:{'Authorization':token}
    }).then(
      (res) => {
        if (res.data.success) {
          const fetchedTask = res.data.data;
          setTaskName(fetchedTask.taskName);
          setTaskDescription(fetchedTask.taskDescription);
          setPriority(fetchedTask.priority);
          setStatus(fetchedTask.status);
          setDueDate(fetchedTask.dueDate ? dayjs(fetchedTask.dueDate) : dayjs());

        } else if(res.data.status==487 || res.data.status==467) {
          navigate('/');
          alert("Please Log In");
        }
        else{
            alert('server error')
        }
      })
      .catch((error) => {
        console.error('Error fetching task details:', error);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

 
  const handleSubmit =  (event) => {
    event.preventDefault();
    try {

      let task = {
        taskName:taskName,
        taskDescription:taskDescription,
        priority:priority,
        status:status,
        dueDate: dueDate.format('YYYY-MM-DD')
      }
      console.log(task)
  
      axios.post('http://localhost:8000/editTasks', { taskid, userid, task },{
          headers:{'Authorization':token}
      }).then(
        (res)=>{
          if (res.data.success) {
            navigate("/home")
            console.log('Task updated successfully:', res.data.msg);
            handleClose();
          } else if(res.data.status==487 || res.data.status==467) {
            navigate('/');
            alert("Please Log In");
          }
          else{
              alert('server error')
          }
        }
      )
      
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Update TODO</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Hi, Update your TODO below!
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="taskName"
            name="taskName"
            label="Task Name"
            variant="outlined"
            type="text"
            fullWidth
            value={taskName}
            onChange={changeTaskName}
          />
          <TextField
            required
            margin="dense"
            id="taskDescription"
            name="taskDescription"
            type="text"
            fullWidth
            variant="outlined"
            value={taskDescription}
            onChange={changeTaskDescription}
          />
          <FormControl fullWidth variant="standard" margin="normal">
            <InputLabel>Priority</InputLabel>
            <Select
              name="priority"
              value={priority}
              onChange={changePriority}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth variant="standard" margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={status}
              onChange={changeStatus}
            >
              <MenuItem value="todo">To Do</MenuItem>
              <MenuItem value="inProgress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth variant="standard" margin="normal">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Due On"
                value={dueDate}
                onChange={changeTaskDue}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>
          <DialogActions>
            <Button onClick={handleClose} variant='outlined' startIcon={<Cancel />}>Cancel</Button>
            <Button type="submit" variant='outlined' startIcon={<Send />}>Update</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
