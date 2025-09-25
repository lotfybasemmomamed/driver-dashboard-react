import { Navigate, Outlet } from "react-router";

export default function RequireAuth() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.email !== "admin@123.com" || user.password !== "admin123") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; 
}
