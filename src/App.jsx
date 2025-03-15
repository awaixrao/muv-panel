import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import LoginPage from "./Pages/LoginPage/LoginPage";
import OrdersPage from "./Pages/OrderPage/OrderPage";

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

      </Route>

      {/* Default Route - Redirect to Login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
