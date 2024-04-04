import { useState } from 'react'
import Nav from './components/Nav'
import Banner from './components/Banner'
import { Box, Container } from "@mui/material";
import TopTalents from './components/TopTalents';
import Footer from './components/Footer';
function App() {
  const [count, setCount] = useState(0)

  return (
    <Box>
      <Nav />
      <Container>
        <Banner />
          <TopTalents/>
          <Footer/>
      </Container>
    
    </Box>
  );
}

export default App
