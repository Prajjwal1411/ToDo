import { Box, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import React from 'react';
import Card from './Card';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  

  return (
    <>
    <Box component="section" style={{ textAlign: "left", display: "flex", justifyContent: "space-evenly" }}>
        <Typography variant="h2" fontWeight={"Regular"}>
          T O D O
        </Typography>
        <Box style={{ display: "flex" }} minWidth={"17vw"}  alignItems={"center"} justifyContent={"space-between"}>
          <Button  onClick={(e) => {
            navigate("/profile");
          }} variant="outlined" startIcon={<AccountCircleOutlinedIcon />}>
            Profile
          </Button>
          <Button onClick={(e) => {
            navigate("/addtask");
          }} variant="outlined" startIcon={<Add />}>
            New Task
          </Button>
        </Box>
      </Box>
      <div style={{ display: "grid", alignItems: "center", justifyContent: "center" }}>
        <Card/>
    </div>
    </>
  );
}

export default Home;
