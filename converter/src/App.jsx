import React from 'react'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Converter from './components/converter'
import Main from './pages/main'
import Rates from './pages/rates';
import './styles/index.css'
import './styles/App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:rates" element={<Rates />} />
      </Routes>
    </Router>
  )
}

export default App



