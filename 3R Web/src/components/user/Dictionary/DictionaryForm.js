import React, { useContext, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { AuthContext } from "../../../auth/AuthContext";
import httpClient from "../../../services/services";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loadProgressBar } from "axios-progress-bar";

import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType
);


const DictionaryForm = () => {
  const [files, setFiles] = useState([]);
  const { user } = useContext(AuthContext);
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      whatis: "",
      reuse: "",
      reduce: "",
      recycle: "",
      category: "",
    },
    onSubmit: (values) => {
      const formData = new FormData();
      const image = files[0].file;
      formData.append("name", values.name);
      formData.append("whatis", values.whatis);
      formData.append("reuse", values.reuse);
      formData.append("reduce", values.reduce);
      formData.append("recycle", values.recycle);
      formData.append("category", values.category);
      formData.append("file", image);

      httpClient
        .postUpload(`user/dictionary/create`, formData, {
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
            navigate("/user/dictionary");
          }, 2000);
          loadProgressBar();
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
    <div className="flex items-center justify-center w-full h-screen">
      <form
        onSubmit={formik.handleSubmit}
        className="w-11/12 p-4 bg-white rounded shadow lg:w-7/12"
      >
        <Link to="/user/reduce" className="text-2xl text-green-500">
          <i className="fa-regular fa-arrow-left"></i>
        </Link>
        <h3 className="mb-2 text-2xl font-bold text-center text-gray-800 lg:text-4xl">
          New Word
        </h3>

        <div className="flex flex-col w-full mt-5 lg:flex-row lg:justify-evenly lg:mb-5">
          <div className="w-full lg:w-5/12">
            <input
              type="text"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              placeholder="name"
              className="w-full px-2 py-2 mb-5 text-base text-black placeholder-gray-500 border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green focus:outline-none rounded-md "
            />
            <textarea
              type="text"
              name="whatis"
              placeholder="what is?"
              onChange={formik.handleChange}
              value={formik.values.whatis}
              className="w-full px-2 py-2 mb-4 text-base text-black placeholder-gray-500 border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green focus:outline-none rounded-md "
            />
            <textarea
              type="text"
              name="reuse"
              onChange={formik.handleChange}
              value={formik.values.reuse}
              placeholder="how can i reuse it?"
              className="w-full px-2 py-2 mb-4 text-base text-black placeholder-gray-500 border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green focus:outline-none rounded-md "
            />
            <textarea
              type="text"
              name="recycle"
              onChange={formik.handleChange}
              value={formik.values.recycle}
              placeholder="how can i recycle it?"
              className="w-full px-2 py-2 mb-4 text-base text-black placeholder-gray-500 border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green focus:outline-none rounded-md "
            />
            <textarea
              type="text"
              name="reduce"
              onChange={formik.handleChange}
              value={formik.values.reduce}
              placeholder="how can i reduce it?"
              className="w-full px-2 py-2 text-base text-black placeholder-gray-500 border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green focus:outline-none rounded-md "
            />
          </div>
          <div className="w-full mt-5 mb-5 lg:w-5/12">
            <select
              name="category"
              onChange={formik.handleChange}
              value={formik.values.category}
              className="w-full px-2 py-2 mb-5 text-base text-black placeholder-gray-500 border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green focus:outline-none rounded-md "
            >
              <option value="">Select Category</option>
              <option value="plastic">Plastic</option>
              <option value="metal">Metal</option>
              <option value="glass">Glass</option>
              <option value="paper">Paper</option>
              <option value="other">Other</option>
            </select>
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
          </div>
        </div>
        <button
          type="submit"
          className="w-full px-12 py-2 mt-4 text-white bg-green-500 rounded focus:bg-primary-400"
        >
          Create
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default DictionaryForm;
