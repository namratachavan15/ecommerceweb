import React from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "../Admin/Admin";
import ProtectedRoute from "./ProtectedRoute";

const AdminRouters = () => {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <ProtectedRoute role="ADMIN">
            <Admin />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AdminRouters;