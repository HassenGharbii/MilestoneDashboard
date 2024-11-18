import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './assets/Pages/Auth';
import Dashboard from './assets/Pages/Itinfrastructure';
import CameraPage from './assets/Pages/CameraPage';
import CameraViewer from './assets/components/CameraStreams';
import EventsComponent from './assets/Pages/Events';
import EventsPage from './assets/Pages/Events';
import HouseDesigner from './assets/Pages/HouseDesigner';


function App() {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if token exists

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route 
          path="/Itinfrastructure"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/itinfrastructure" />}
        />
          <Route 
          path="/cameras"
          element={isAuthenticated ? <CameraPage /> : <Navigate to="/cameras" />}
        />
          <Route 
          path="/CameraViewer"
          element={isAuthenticated ? <CameraViewer /> : <Navigate to="/cameras" />}
        />
           <Route 
          path="/HouseDesigner"
          element={isAuthenticated ? <HouseDesigner /> : <Navigate to="/HouseDesigner" />}
        />
       
      </Routes>
    </Router>
  );
}

export default App;
