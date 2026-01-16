import React from "react";
import AdminDashboard from "./Admindashboard";
import MentorDashboard from "./Mentordashboard"; // Added missing import
import StudentComingSoon from "./StudentComingSoon";

const Dashboard = () => {
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const role = user?.role;

  if (role === "ADMIN") return <AdminDashboard />;
  if (role === "MENTOR") return <MentorDashboard user={user} />;

  // Default for Students
  return <StudentComingSoon user={user} />;
};

export default Dashboard;
