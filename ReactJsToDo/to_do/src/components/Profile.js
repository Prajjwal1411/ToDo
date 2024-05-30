import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { LogoutOutlined, Send } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';






export default function Profile() {


  const navigate=useNavigate()
  const userId=sessionStorage.getItem('userId')
  const token=sessionStorage.getItem('token')
  const [fname,setfName]=React.useState('');
  const [lname,setlName]=React.useState('');
  const [email,setEmail]=React.useState('');

  


    axios.post('http://localhost:8000/getuser',{userId},{
      headers:{'Authorization':token}
    }).then((res) => {
        if (res.data.success) {
          const userDetail=res.data.data
          setfName(userDetail.firstName);
          setlName(userDetail.lastName);
          setEmail(userDetail.email);
          
        } else if(res.data.status==487 || res.data.status==467) {
          navigate('/');
          alert("Please Log In");
        }
        else{
            alert(res.data.msg)
        }
      })

  const handleSubmit = (event) => {
    event.preventDefault();
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('token');
    navigate("/");
    
  };

  return (
   
      <Container component="main" maxWidth="s" sx={{display:'flex', justifyContent:'center'}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Typography  variant="h1">
            Hi {fname} 
            
          </Typography>
         
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  value={fname}
                  fullWidth
                  id="firstName"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  value={lname}
                  id="lastName"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={email}
                  id="email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
             
            </Grid>
            <Button
              type="Submit"
              endIcon={<LogoutOutlined/>}
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
            >
              Log out
            </Button>
           
          </Box>
        </Box>
      </Container>
   
  );
}