import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";
import AuthWatcher from "./utils/ValidatorToken/AuthWrapper.tsx";
import LanguageSelector from "./utils/Lenguages/LenguageSelector.tsx";
import { SavedPost } from "./pages/SavedPost/SavedPost";
import { Login } from "./pages/Home/Login/Login.tsx";
import Home from "./pages/Home/Home.tsx";
import { Profile } from "./pages/Profile/Profile.tsx";
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");
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
            path="/save"
            element={
              <ProtectedRoute>
                <SavedPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/feed"
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
