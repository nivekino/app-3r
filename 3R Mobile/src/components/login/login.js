import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { types } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import httpClient from "../../services/services";
import { ToastContainer, toast } from "react-toastify";
import { loadProgressBar } from "axios-progress-bar";
import bgSmall from "./assets/bg-small.png";
import bgLarge from "./assets/bg-large.png";
import jwt_decode from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";
import "axios-progress-bar/dist/nprogress.css";
import { NavLink } from "react-router-dom";

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      const { username, password } = values;
      httpClient
        .post("auth/login", { username, password })
        .then(({ data }) => {
          const { token, message } = data;
          if (token) {
            const { userId, role } = jwt_decode(token);
            dispatch({
              type: types.login,
              payload: { token, username, userId, role },
            });

            toast.success(message, {
              position: "top-center",
              autoClose: 1400,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setTimeout(() => {
              if (role === 1) {
                navigate("/admin");
              } else {
                navigate("/user");
              }
            }, 2000);
          }
        })
        .catch((err) => {
          const { message } = err.response.data;

          toast.error(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    },
  });

  useEffect(() => {
    loadProgressBar();
  }, []);

  return (
    <div className="h-screen w-screen flex items-center flex-col lg:flex-row lg:justify-between lg:bg-yellowr">
      <div className="w-full h-auto lg:w-6/12">
        <img
          src={bgLarge}
          alt="hoja"
          className="lg:w-auto lg:h-screen lg:object-cover w-full h-96 hidden lg:block md:block"
        />
        <img
          src={bgSmall}
          alt="hoja"
          className="lg:w-auto lg:h-screen object-cover w-full h-96 block lg:hidden md:hidden"
        />
      </div>
      <div className="w-full h-auto lg:w-4/12 px-8">
        <form
          onSubmit={formik.handleSubmit}
          className="h-full flex flex-col justify-evenly items-center"
        >
          <h2 className="text-green-500 text-6xl font-bold">Log <span className="text-gray-800">in!</span></h2>

          <input
            type="text"
            name="username"
            placeholder="username"
            onChange={formik.handleChange}
            value={formik.values.username}
            className="focus:border-green focus:ring-1 focus:ring-green focus:outline-none
            w-full
            text-base text-black
            placeholder-gray-500
            border border-gray-200
            rounded-md
            py-2
            px-2
            mt-10
            input-login"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={formik.handleChange}
            value={formik.values.password}
            className="focus:border-green focus:ring-1 focus:ring-green focus:outline-none
            w-full
            text-base text-black
            placeholder-gray-500
            border border-gray-200
            rounded-md
            py-2
            px-2
            my-4
            input-login"
          />
          <button
            type="submit"
            className="focus:bg-primary-400 py-2 px-12 rounded bg-green-500 text-white mt-4"
          >
            Login
          </button>
        </form>
        <div className="flex justify-evenly mt-20">
          <p className="title-new-account">Don't have an account yet? </p>
          <NavLink className="ml-4 text-green-500" to="/signup"> Sign up</NavLink>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
