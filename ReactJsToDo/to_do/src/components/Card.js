import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import axios from 'axios';
import EditForm from './Alert/UpdateForm';
import DeleteData from './Alert/DeleteData';
import { useNavigate } from 'react-router-dom';

export default function CardData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId=sessionStorage.getItem('userId');
  const token=sessionStorage.getItem('token');
  const navigate=useNavigate();
  useEffect(() => {
    axios.post("http://localhost:8000/getTasks", { userId }, {
      headers: { 'Authorization': token }
    })
      .then((res) => {
        if (res.data.success) {
          setData(res.data.data.tasks);
        } else if(res.data.status==487 || res.data.status==467) {
          navigate('/');
          
        }
        else{
            alert('server error')
        }
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <Typography variant='h5'>Loading...</Typography>;
  }

  if (data.length === 0) {
    return <Typography variant='h5'>Please Add Tasks first</Typography>;
  }

  return (
    <div style={{ display: "flex", minHeight: "80vh", maxWidth: "80vw", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
      {data.map((task, key) => (
        <Card key={key} sx={{ minWidth: 400, border: 1, borderColor: 'primary.main', margin:"5vh 0vh 0vh 5vh"}}>
          <CardContent>
            <Box style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography gutterBottom variant="h5">
                {task.taskName}
              </Typography>
              <Typography variant="h7">
                {task.priority}
              </Typography>
            </Box>
            <Typography variant="body2" textAlign="left" color="text.secondary">
              {task.taskDescription}
            </Typography>
          </CardContent>
          <Box display={"flex"} width="100%" alignItems={"center"} justifyContent={"space-around"}>
            <Typography variant="body2" textAlign="left" color="text.secondary"> DueOn: {task.dueDate}</Typography>
            <CardActions>
              <EditForm taskid={task.taskid}/>
              <DeleteData taskid={task.taskid}/>
            </CardActions>
          </Box>
        </Card>
      ))}
    </div>
  );
}
