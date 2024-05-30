import { Box, Button, Fab, Typography } from '@mui/material';
import React from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AddTaskForm from './AddTaskForm';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box component="section" style={{ textAlign: "left", margin: "5vh 0vw 0vh 18.5vw", display: "flex", justifyContent: "space-between" }}>
        <Fab onClick={(e) => {
          navigate("/home");
        }} color='primary' variant='outlined' style={{ textAlign: "left", display: "flex", margin: "1vh 4vw 0vh 0vw", justifyContent: "space-around" }}>
          <ArrowBack />
        </Fab>
        <Typography variant="h2" fontWeight={"Regular"}>
          A D D T A S K
        </Typography>
        <Box>
          <Button variant="outlined" startIcon={<AccountCircleOutlinedIcon />} style={{ textAlign: "left", display: "flex", margin: "3.2vh 20vw 0vh 0vw", justifyContent: "space-around" }}>
            Profile
          </Button>
        </Box>
      </Box>
      <Box>
        <AddTaskForm/>
      </Box>
    </>
  );
}

export default AddTask;
