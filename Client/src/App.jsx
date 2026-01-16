import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";

// Ensure files are named exactly like these paths
const Home = lazy(() => import("./pages/Home"));
const Auth = lazy(() => import("./components/Auth"));
const MentorRegistration = lazy(() =>
  import("./components/MentorRegistration")
);
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AdminDashboard = lazy(() => import("./pages/Admindashboard"));

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");
  let user = null;

  try {
    user = userData ? JSON.parse(userData) : null;
  } catch (e) {
    localStorage.clear();
    return <Navigate to="/auth" replace />;
  }

  if (!token || !user) return <Navigate to="/auth" replace />;
  if (allowedRole && user.role !== allowedRole) {
    const fallback = user.role === "ADMIN" ? "/admin/dashboard" : "/dashboard";
    return <Navigate to={fallback} replace />;
  }
  return children;
};

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  if (token && user) {
    const dest = user.role === "ADMIN" ? "/admin/dashboard" : "/dashboard";
    return <Navigate to={dest} replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <div className="App bg-[#FFFBF0] dark:bg-slate-950 min-h-screen transition-colors duration-300">
        <Navbar />
        <Suspense
          fallback={
            <div className="h-screen flex items-center justify-center bg-[#FFFBF0] dark:bg-slate-950">
              <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin" />
            </div>
          }
        >
          <div className="pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/auth"
                element={
                  <PublicRoute>
                    <Auth />
                  </PublicRoute>
                }
              />
              <Route
                path="/apply-mentor"
                element={
                  <PublicRoute>
                    <MentorRegistration />
                  </PublicRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute allowedRole="ADMIN">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
