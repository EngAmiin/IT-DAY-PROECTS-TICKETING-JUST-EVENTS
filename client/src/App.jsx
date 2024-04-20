import { useState } from 'react'
import Nav from './components/Nav'
import { Box, Container, CssBaseline, Paper, ThemeProvider } from "@mui/material";
import Projects from './pages/Projects';
import Home from "./components/Home";
import Footer from './components/Footer'
import {routes} from './routes/allRoutes'
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import  { darkTheme, lightTheme } from './theme/AppTheme';
import DarkModeToggle from './components/DarkMode';
function App() {
  const [count, setCount] = useState(0)
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider  theme={darkMode ? darkTheme : lightTheme}>
    <CssBaseline />
    {/* Rest of your app content */}
    <Paper>
      <Router>
        <Nav />
     <Routes> 
 {routes.map((route, index)=>{
   return (
    
       <Route
         key={index}
         path={route.path}
         exact={route.exact}
         element={<route.component/>}
       />
    
   );
 }) }
     </Routes>
       
        <Footer />
      </Router>
    </Paper>
    <DarkModeToggle darkMode={darkMode} onDarkModeToggle={handleDarkModeToggle} />
  </ThemeProvider>
    
  );
}

export default App
