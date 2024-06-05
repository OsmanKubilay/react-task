import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './dashboard';
function App() {
  return (
    <div className="App">
      {/* useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(res => console.log(res))
        .catch(err => console.log(err))
      }, []) */}
      <BrowserRouter>
    
          <Routes>
            <Route path="/*" element={<Dashboard />} />
          </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
