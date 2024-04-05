import { useState } from 'react'
import Nav from './components/Nav'
import { Box, Container } from "@mui/material";
import Projects from './pages/Projects';
import Home from "./components/Home";
import Footer from './components/Footer'
import {routes} from './routes/allRoutes'
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
function App() {
  const [count, setCount] = useState(0)

  return (
    <Box>
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
    </Box>
  );
}

export default App
