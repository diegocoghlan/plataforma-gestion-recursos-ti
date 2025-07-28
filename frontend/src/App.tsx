import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Dashboard from './pages/Dashboard';
import Solicitudes from './pages/Solicitudes';
import Propuesta from './pages/Propuesta';

const App: React.FC = () => (
  <BrowserRouter>
    <NavBar />
    <div style={{ paddingTop: '2rem' }}></div>
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/solicitudes" element={<Solicitudes />} />
      <Route path="/propuesta/:id" element={<Propuesta />} />
    </Routes>
  </BrowserRouter>
);

export default App;