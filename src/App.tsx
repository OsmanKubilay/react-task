import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
    
          <Routes>
            <Route path="/*" element={<Dashboard />} />
          </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
