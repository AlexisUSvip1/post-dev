import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Login/Login.tsx';
import Home from './components/Home/Home.tsx';
import './App.css';
import LanguageSelector from './Utils/Lenguages/LenguageSelector.tsx';
import AuthWatcher from './Utils/ValidatorToken/AuthWrapper.tsx';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? <>{children}</> : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <AuthWatcher />
      <div className="containerApp">
        <LanguageSelector />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
