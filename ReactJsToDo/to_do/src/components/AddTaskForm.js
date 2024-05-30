import React, { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button, Card, Box } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddTaskForm = () => {
  const [taskName, setTaskName] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [taskDue, setTaskDue] = useState(dayjs());
  const navigate=useNavigate()
  const userId=sessionStorage.getItem('userId');
  const token=sessionStorage.getItem('token');
  const changeTaskName = (e) => {
    setTaskName(e.target.value);
  }

  const changeTaskDescription = (e) => {
    setTaskDesc(e.target.value);
  }

  const changePriority = (e) => {
    setPriority(e.target.value);
  }

  const changeStatus = (e) => {
    setStatus(e.target.value);
  }

  const changeTaskDue = (date) => {
    setTaskDue(date);
  }

  axios.post("http://localhost:8000/getuser",{userId},{
      headers:{'Authorization':token}
    }).then(res => {
      if(res.data.status==487 || res.data.status==467) {
        navigate('/');
        alert("Please Log In");
      }
    })
  const handleSubmit = (e) => {
    e.preventDefault();

    let taskData = {
      taskName: taskName,
      taskDescription: taskDesc,
      priority: priority,
      status: status,
      dueDate: taskDue.format('YYYY-MM-DD'),
      userId: userId
    }

    axios.post("http://localhost:8000/addTask", taskData,{
      headers:{'Authorization':token}
    })
      .then(res => {
        if (res.data.success) {
          alert(res.data.msg);
          setTimeout(()=>{
            navigate('/home')
          },1000)
          
        } else if(res.data.status==487 || res.data.status==467) {
          navigate('/');
          alert("Please Log In");
        }
        else{
            alert('server error')
        }
      }).catch(err => {
        alert(err);
      });
  };

  return (
    <div style={{ display: "flex", padding: "5vh", justifyContent: "space-evenly" }}>
      <Card sx={{ minWidth: 880, border: 1, borderColor: 'primary.main' }} style={{ padding: "5vh" }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Task Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={taskName}
            onChange={changeTaskName}
          />
          <TextField
            label="Task Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={taskDesc}
            onChange={changeTaskDescription}
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Priority</InputLabel>
            <Select label="Priority" value={priority} onChange={changePriority}>
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Status</InputLabel>
            <Select label="Status" value={status} onChange={changeStatus}>
              <MenuItem value="todo">To Do</MenuItem>
              <MenuItem value="inProgress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth variant="outlined" margin="normal">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Due On"
                value={taskDue}
                onChange={changeTaskDue}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>
          <Box display={'flex'} justifyContent={'flex-end'}>
            <Button size="medium" variant='outlined' type="submit" style={{ margin: "2vh" }}>Submit</Button>
            <Button size="medium" color='error' variant='outlined' style={{ margin: "2vh" }}>Cancel</Button>
          </Box>
        </form>
      </Card>
    </div>
  );
};

export default AddTaskForm;
