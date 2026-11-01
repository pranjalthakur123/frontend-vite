
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
   fetch("https://django-backend-6-xahr.onrender.com/api/auth/check/", {
  method: "GET",
  credentials: "include",
})
      .then((response) => {
        if (!response.ok) {
          setAuthenticated(false);
          return;
        }
        return response.json();
      })
      .then((data) => {
        if (data) setAuthenticated(data.authenticated === true);
      })
      .catch(() => setAuthenticated(false));
  }, []);

  if (authenticated === null) return <p>Checking login...</p>;

  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
