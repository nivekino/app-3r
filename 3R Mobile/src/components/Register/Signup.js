import React from "react";
import imgLog from "../../images/img-log.png";
import { useFormik } from "formik";
import httpClient from "../../services/services";
import { ToastContainer, toast } from "react-toastify";
import { loadProgressBar } from "axios-progress-bar";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      username: "",
    },
    onSubmit: (values) => {
      const { email, password, username } = values;

      httpClient
        .post("auth/signup", { username, email, password, role: 2 })
        .then((res) => {
          loadProgressBar();
          const { message } = res.data;
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
            navigate("/");
          }, 2000);
        })
        .catch((err) => {
          const { message } = err.response.data;
          toast.error(message, {
            position: "top-center",
            autoClose: 1400,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    },
  });

  return (
    <div className="bg-yellowr w-full h-screen flex flex-col items-center p-8">
      <form onSubmit={formik.handleSubmit} className="w-full">
        <img className=" object-cover w-56 h-56 img-card" src={imgLog} alt="" />
        <p className="text-black text-xl text-center mt-4">
          Help us to get to <span className="text-greenr">know you</span>{" "}
          better!
        </p>
        <p className="text-black text-xs mt-4 justify-self-start self-start">
          Username
        </p>
        <input
          type="text"
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          className="w-full px-2 py-2 mb-5 mt-2 text-base text-black placeholder-gray-500 border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green focus:outline-none rounded-md "
        />

        <p className="text-black text-xs justify-self-start self-start">
          Email
        </p>
        <input
          type="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          className="w-full px-2 py-2 mb-5 mt-2 text-base text-black placeholder-gray-500 border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green focus:outline-none rounded-md "
        />

        <p className="text-black text-xs justify-self-start self-start">
          Password
        </p>
        <input
          type="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          className="w-full px-2 py-2 mb-5 mt-2 text-base text-black placeholder-gray-500 border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green focus:outline-none rounded-md "
        />
        <button
          type="submit"
          className="w-full px-8 py-2 mt-4 text-white bg-greenr rounded-lg focus:bg-primary-400"
        >
          Register
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
