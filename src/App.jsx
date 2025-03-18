import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import LoginPage from "./Pages/LoginPage/LoginPage";
import OrdersPage from "./Pages/OrderPage/OrderPage";
import RidesPage from "./Pages/RidesPage/RidesPage";
import ClientsPage from "./Pages/ClientsPage/ClientsPage";
import CarClassesPage from "./Pages/CarClassesPage/CarClassesPage";
import LiveMapPage from "./Pages/LiveMapPage/LiveMapPage";
import ModeratorsPage from "./Pages/ModeratorsPage/ModeratorsPage";
import DriverPage from "./Pages/DriverPage/DriverPage";

function App() {
  return (
    <Routes>
      {/* Login Route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Dashboard Layout */}
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="rides" element={<RidesPage />} />
        <Route path="clients" element={<ClientsPage />} />
        <Route path="drivers" element={<DriverPage />} />

        <Route path="car-classes" element={<CarClassesPage />} />
        <Route path="live-map" element={<LiveMapPage />} />
        <Route path="moderators" element={<ModeratorsPage />} />



      </Route>

      {/* Default Route - Redirect to Login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
