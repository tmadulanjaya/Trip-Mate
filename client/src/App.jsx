import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import TripDetailsPage from "./pages/TripDetailsPage";
import CreateTripPage from "./pages/CreateTripPage";
import NotFoundPage from "./pages/NotFoundPage";
import "./index.css";

// Mock auth — replace with real context later
const mockCurrentUser = { id: "u1", name: "Pasindu", avatar: "P" };

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar currentUser={mockCurrentUser} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage currentUser={mockCurrentUser} />} />
            <Route path="/trips/new" element={<CreateTripPage currentUser={mockCurrentUser} />} />
            <Route path="/trips/:tripId" element={<TripDetailsPage currentUser={mockCurrentUser} />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
