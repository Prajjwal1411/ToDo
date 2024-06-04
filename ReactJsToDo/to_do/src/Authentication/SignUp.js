import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
        T O D O
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.



export default function SignUp() {

  const[fname,setFname]=React.useState();
  const[lname,setLname]=React.useState();
  const[email,setEmail]=React.useState();
  const[password,setPassword]=React.useState();
  const navigate=useNavigate();

const changeFirstName=(e)=>{
    setFname(e.target.value)
}
const changeLastName=(e)=>{
    setLname(e.target.value)
}
const changeEmail=(e)=>{
    setEmail(e.target.value)
}
const changePassword=(e)=>{
    setPassword(e.target.value)
}

  const handleSubmit = (event) => {
    event.preventDefault();
        let register={
            firstName:fname,
            lastName:lname,
            password:password,
            email:email
        }

    
        axios.post("http://localhost:8000/register",register)
        .then(res=>{
            if(res.data.success){
              navigate('/');
            }
            else{
                alert(res.data.msg);
            }
        }).catch(err=>{
            alert(err);
    })


  };

  return (
   
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Typography  variant="h3">
            Hello, 
          </Typography>
          <Typography  variant="h6">
            Let's Sign Up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={fname}
                  onChange={changeFirstName}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={lname}
                  onChange={changeLastName}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={changeEmail}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={changePassword}
                  autoComplete="new-password"
                />
              </Grid>
             
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link onClick={(e)=>{navigate('/')}} variant="body2">
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
   
  );
}