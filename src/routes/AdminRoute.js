import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Outlet, Navigate } from "react-router-dom";

const AdminRoute = () => {
  const [admin, setAdmin] = useState(false);
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get(`http://localhost:3001/users?email=${user.email}`)
        .then(({ data }) => {
          if (data[0].role === "admin") {
            setAdmin(true);
          } else {
            setAdmin(false);
          }
        });
    }
  }, [user?.email, isAuthenticated]);

  console.log(admin);
  return admin ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
