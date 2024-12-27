import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./components/Login/Login.tsx";
import Home from "./components/Home/Home.tsx";
import "./App.css";
import LanguageSelector from "./Utils/Lenguages/LenguageSelector.tsx";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <>{children}</> : <Navigate to="/" />;
};

function App() {
  return (

    <div className="containerApp">
      <LanguageSelector />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute><Home /></ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;