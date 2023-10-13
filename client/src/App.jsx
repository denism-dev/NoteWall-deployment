import React from 'react';
import { BrowserRouter, Route, Routes, Link, Outlet, useNavigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import WriteNote from './components/WriteNote';
import EditNote from './components/EditNote';
import RandomNote from './components/RandomNote';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/write">Write Note</Link>
          </li>
          <li>
            <Link to="/random">Random Note</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/write" element={<WriteNote />} />
        <Route path="/edit/:id" element={<EditNote />} />
        <Route path="/random" element={<RandomNote />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

