import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute({ path, ...props }) {
  const user = localStorage.getItem("user");
  return user ? <Outlet {...props} /> : <Navigate to="/auth" />;
}

export default PrivateRoute;
