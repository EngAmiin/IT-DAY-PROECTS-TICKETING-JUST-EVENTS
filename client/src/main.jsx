import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './custom/style.css'
import "bootstrap/dist/css/bootstrap.min.css";
import '../fonts/poppins.css'
import { ContextAPIProvider } from './context/Provider.jsx';
import './locale/config.js'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextAPIProvider>
      <App />
    </ContextAPIProvider>
  </React.StrictMode>
);
