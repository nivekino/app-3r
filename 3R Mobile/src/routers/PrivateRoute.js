import React from "react";


import { Navigate } from "react-router-dom";

function PrivateRoute({ children, user, roleNeed, ...rest }) {
  const auth = user.logged;
  const role = user.role;
  return auth && role === roleNeed ? children : <Navigate to="/" />;
}

export default PrivateRoute;
