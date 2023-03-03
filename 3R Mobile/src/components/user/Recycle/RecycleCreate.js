import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { FilePond, registerPlugin } from "react-filepond";
import { AuthContext } from "../../../auth/AuthContext";
import httpClient from "../../../services/services";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loadProgressBar } from "axios-progress-bar";
import { Link } from "react-router-dom";
import generalGarbage from "./assets/1.png";
import foodWaste from "./assets/2.png";
import glass from "./assets/3.png";
import plastic from "./assets/4.png";
import cardboard from "./assets/5.png";
import "filepond/dist/filepond.min.css";
import "./assets/style.css";


import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType);

const RecycleCreate = () => {
  const [files, setFiles] = useState([]);
  const [type, setType] = useState("general");
  const { user } = useContext(AuthContext);
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      amount: "",
      place: "",
    },
    onSubmit: (values) => {
      const { name, amount, place } = values;
      const image = files[0].file;
      const formData = new FormData();
      formData.append("name", name);
      formData.append("amount", amount);
      formData.append("place", place);
      formData.append("file", image);
      formData.append("typeProduct", type);

      httpClient
        .postUpload("user/recycles/create", formData, {
          Authorization: `JWT ${user.token}`,
        })
        .then((res) => {
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
            navigate("/user/recycle");
          }, 2000);
          loadProgressBar();
        })
        .catch((err) => {
          const { message } = err.response.data;
          toast.error(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
        });
    },
  });

  return (
    <div className="w-full h-screen mt-5 px-9">
      <Link to="/user/recycle" className="text-2xl text-green-500">
        <i className="fa-regular fa-arrow-left"></i>
      </Link>
      <div className="w-full mt-5">
        <form className="w-full flex flex-col justify-center items-center" onSubmit={formik.handleSubmit}>
          <h2 className="text-4xl font-semibold text-center text-gray-800 lg:text-6xl">
            Time to <span className="text-green-500">recycle!</span>
          </h2>
          <p className="text-gray-800 text-2xl mt-5 text-center lg:text-5xl">
            Add a new product to you want to reclycle
          </p>
          <div className="w-full mt-5 flex flex-col lg:w-8/12">
            <p className="text-gray-800 text-xl mt-5 text-center lg:text-3xl">
              What kind of product you want to recycle?
            </p>

            <div className="w-full mt-4 flex flex-row justify-between items-start">
              <div
                className={type === "general" ? "w-2/12 opacity-50" : "w-2/12"}
              >
                <img
                  src={generalGarbage}
                  alt="garbage"
                  className="w-full h-auto lg:w-10/12"
                  onClick={() => setType("general")}
                />
                <p className="text-gray-800 text-center text-sm">
                  General garbage
                </p>
              </div>
              <div className={type === "food" ? "w-2/12 opacity-50" : "w-2/12"}>
                <img
                  src={foodWaste}
                  alt="garbage"
                  className="w-full h-auto lg:w-10/12"
                  onClick={() => setType("food")}
                />
                <p className="text-gray-800 text-center text-sm">Food waste</p>
              </div>
              <div
                className={type === "glass" ? "w-2/12 opacity-50" : "w-2/12"}
              >
                <img
                  src={glass}
                  alt="garbage"
                  className="w-full h-auto lg:w-10/12"
                  onClick={() => setType("glass")}
                />
                <p className="text-gray-800 text-center text-sm">Glass</p>
              </div>
              <div
                className={type === "plastic" ? "w-2/12 opacity-50" : "w-2/12"}
              >
                <img
                  src={plastic}
                  alt="garbage"
                  className="w-full h-auto lg:w-10/12"
                  onClick={() => setType("plastic")}
                />
                <p className="text-gray-800 text-center text-sm">
                  Plastic metal
                </p>
              </div>
              <div
                className={
                  type === "cardboard" ? "w-2/12 opacity-50" : "w-2/12"
                }
              >
                <img
                  src={cardboard}
                  alt="garbage"
                  className="w-full h-auto lg:w-10/12"
                  onClick={() => setType("cardboard")}
                />
                <p className="text-gray-800 text-center text-sm">Paper</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center w-full mt-5 lg:flex-row lg:justify-evenly">
            <div className="flex flex-col w-full lg:w-5/12">
              <input
                type="text"
                name="name"
                placeholder="Product name"
                onChange={formik.handleChange}
                value={formik.values.name}
                className="w-full px-2 py-2 mt-5 text-base text-black placeholder-gray-500 border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green focus:outline-none rounded-md input-login"
              />
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                onChange={formik.handleChange}
                value={formik.values.amount}
                className="w-full px-2 py-2 mt-5 text-base text-black placeholder-gray-500 border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green focus:outline-none rounded-md input-login"
              />
              <input
                type="text"
                name="place"
                placeholder="Place"
                onChange={formik.handleChange}
                value={formik.values.place}
                className="w-full px-2 py-2 mt-5 text-base text-black placeholder-gray-500 border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green focus:outline-none rounded-md input-login"
              />
            </div>
            <div className="w-full mt-10 lg:w-5/12">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Upload picture or video
              </label>
              <FilePond
                files={files}
                onupdatefiles={setFiles}
                allowMultiple={true}
                //instantUpload={false}
                acceptedFileTypes={["image/*"]}
                required={true}
                maxFiles={1}
                name="files"
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
              />

              <button
                type="submit"
                className="w-full px-12 py-2 mt-4 text-white bg-green-500 rounded focus:bg-primary-400"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RecycleCreate;
