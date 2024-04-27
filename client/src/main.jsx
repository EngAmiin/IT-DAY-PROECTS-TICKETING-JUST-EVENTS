import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './custom/style.css'
import "bootstrap/dist/css/bootstrap.min.css";
import '../fonts/poppins.css'
import { ContextAPIProvider } from './context/Provider.jsx';
import './locale/config.js'
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   <ChakraProvider>
   <ContextAPIProvider>
      <App />
    </ContextAPIProvider>
   </ChakraProvider>
  </React.StrictMode>
);
