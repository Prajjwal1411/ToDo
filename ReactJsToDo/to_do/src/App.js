import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import AddTask from './components/AddTask';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import { IconButton, Paper } from '@mui/material';
import React from 'react';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LogIn from './Authentication/LogIn';
import SignUp from './Authentication/SignUp';
import Profile from './components/Profile';



const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {

  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );  return (
    <ThemeProvider theme={theme}>
      <Paper>
      <div className="App">
      Theme:
      <IconButton  onClick={colorMode.toggleColorMode} color="inherit">
       
        {theme.palette.mode === 'dark' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
      </IconButton>
      <Router>
        <Routes>
        <Route path='/' element={<LogIn/>}/>
 
          <Route path='/home' element={<Home/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/addtask' element={<AddTask/>}/>
        </Routes>
      </Router>
      
      </div>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
