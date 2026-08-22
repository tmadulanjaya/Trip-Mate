import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import TripDetailsPage from "./pages/TripDetailsPage";
import CreateTripPage from "./pages/CreateTripPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./index.css";

function AppContent() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar currentUser={user} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage currentUser={user} />} />
            <Route path="/dashboard" element={<DashboardPage currentUser={user} />} />
            <Route path="/trips/new" element={<CreateTripPage currentUser={user} />} />
            <Route path="/trips/:tripId" element={<TripDetailsPage currentUser={user} />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
