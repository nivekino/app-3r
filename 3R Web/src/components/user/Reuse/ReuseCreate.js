import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { FilePond, registerPlugin } from "react-filepond";
import { AuthContext } from "../../../auth/AuthContext";
import httpClient from "../../../services/services";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loadProgressBar } from "axios-progress-bar";
import { Link } from "react-router-dom";

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


const ReuseCreate = () => {
  const [files, setFiles] = useState([]);
  const { user } = useContext(AuthContext);
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      hashtag1: "",
      hashtag2: "",
    },
    onSubmit: (values) => {
      const { title, description, hashtag1, hashtag2 } = values;
      const image = files[0].file;
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("hashtag1", hashtag1);
      formData.append("hashtag2", hashtag2);
      formData.append("file", image);

      httpClient
        .postUpload("user/reuses/create", formData, {
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
            navigate("/user/reuse");
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
            draggable: true,
            progress: undefined,
          });
        });
    },
  });

  return (
    <div className="w-full mt-5 px-9">
      <Link to="/user/reuse" className="text-2xl text-green-500">
        <i className="fa-regular fa-arrow-left"></i>
      </Link>
      <div className="w-full mt-5">
        <form className="px-6 w-full" onSubmit={formik.handleSubmit}>
          <h2 className="font-semibold text-center text-gray-800 text-xl">
            Create reuse idea
          </h2>
          <div className="w-full flex flex-col lg:flex-row lg:justify-evenly items-center mt-5">
            <div className="w-full flex flex-col lg:w-5/12">
              <input
                type="text"
                name="title"
                placeholder="Title"
                onChange={formik.handleChange}
                value={formik.values.title}
                className="focus:border-green-500 focus:ring-1 focus:ring-green focus:outline-none
            w-full
            text-base text-black
            placeholder-gray-500
            border border-gray-200
            rounded-md
            py-2
            px-2
            mt-5
            input-login"
              />
              <input
                type="text"
                name="hashtag1"
                placeholder="hashtag 1"
                onChange={formik.handleChange}
                value={formik.values.hashtag1}
                className="focus:border-green-500 focus:ring-1 focus:ring-green focus:outline-none
            w-full
            text-base text-black
            placeholder-gray-500
            border border-gray-200
            rounded-md
            py-2
            px-2
            mt-5
            input-login"
              />
              <input
                type="text"
                name="hashtag2"
                placeholder="hashtag 2"
                onChange={formik.handleChange}
                value={formik.values.hashtag2}
                className="focus:border-green-500 focus:ring-1 focus:ring-green focus:outline-none
            w-full
            text-base text-black
            placeholder-gray-500
            border border-gray-200
            rounded-md
            py-2
            px-2
            mt-5
            input-login"
              />
              <textarea
                type="text"
                name="description"
                placeholder="Description"
                onChange={formik.handleChange}
                value={formik.values.description}
                className="focus:border-green-500 focus:ring-1 focus:ring-green focus:outline-none
            w-full
            text-base text-black
            placeholder-gray-500
            border border-gray-200
            rounded-md
            py-2
            px-2
            mt-5
            input-login"
              />
            </div>
            <div className="w-full mt-10 lg:w-5/12">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Upload picture or video
              </label>
              <FilePond
                files={files}
                onupdatefiles={setFiles}
                allowMultiple={true}
                //instantUpload={false}
                acceptedFileTypes={["video/mp4", "image/*"]}
                required={true}
                maxFiles={1}
                name="files"
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
              />

              <button
                type="submit"
                className="focus:bg-primary-400 py-2 px-12 rounded w-full bg-green-500 text-white mt-4"
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

export default ReuseCreate;
