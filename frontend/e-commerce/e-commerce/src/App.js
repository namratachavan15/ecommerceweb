import "./App.css";
import { Routes, Route } from "react-router-dom";

import CustomerRouter from "./routers/CustomerRouter";
import AdminRouters from "./routers/AdminRouters";
import AdminLogin from "./customer/Auth/AdminLogin";

function App() {
  return (
    <Routes>

      {/* ================= ADMIN LOGIN ================= */}
      <Route path="/login" element={<AdminLogin />} />

      {/* ================= ADMIN DASHBOARD ================= */}
      <Route path="/admin/*" element={<AdminRouters />} />

      {/* ================= CUSTOMER WEBSITE ================= */}
      <Route path="/*" element={<CustomerRouter />} />

    </Routes>
  );
}

export default App;