import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";

// Pages
import Signup from "../pages/Signup";
import SignupOtp from "../pages/SignupOtp";
import Dashboard from "../pages/Dashboard";
import Signin from "../pages/Signin";
import { useEffect, useState } from "react";
import DashboardLayout from "./Layout";
import { useAuthStore } from "../store/useAuthStore";
import UploadVideo from "../pages/UploadVideo";
import ZoomMeeting from "../pages/ZoomMeeting";

const AppRoutes = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuthStore();
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Converts to true/false
  }, [isAuthenticated]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Or a spinner
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <DashboardLayout>
                <Navigate to="/dashboard" replace />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload-meeting"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <DashboardLayout>
                <UploadVideo />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/zoom-meeting"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <DashboardLayout>
                <ZoomMeeting />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route path="/auth/signin" element={<Signin />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/signup-otp" element={<SignupOtp />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
