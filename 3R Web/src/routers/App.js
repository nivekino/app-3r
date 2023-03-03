import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import RoutesAdmin from "../routers/RoutesAdmin";
import RoutesUser from "../routers/RoutesUser";
import PrivateRoute from "./PrivateRoute";
import Login from "../components/login/login";
import Signup from "../components/Register/Signup";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route
          path="/admin/*"
          element={
            <PrivateRoute user={user} roleNeed={1}>
              <RoutesAdmin />
            </PrivateRoute>
          }
        />

        <Route
          path="/user/*"
          element={
            <PrivateRoute user={user} roleNeed={2}>
              <RoutesUser />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
