import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
       <Navbar />
       <Dashboard />
      </div>
    </BrowserRouter>
  );
}

export default App;
