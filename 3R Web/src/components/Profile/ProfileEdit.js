import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import httpClient from "../../services/services";
import { useFormik } from "formik";
import { FilePond, registerPlugin } from "react-filepond";
import { ToastContainer, toast } from "react-toastify";
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

const ProfileEdit = () => {
  const [files, setFiles] = useState([]);
  const { user } = useContext(AuthContext);
  const [dataProfile, setDataProfile] = useState([]);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
    },
    onSubmit: (values) => {
      const formData = new FormData();
      const image = files[0].file;

      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("file", image);

      httpClient
        .postUpload(`user/info/updateInfo/${user.userId}`, formData, {
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
            window.location.reload();
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

  useEffect(() => {
    httpClient
      .get(`user/info/${user.userId}`, {
        Authorization: `JWT ${user.token}`,
      })
      .then((res) => {
        setDataProfile(res.data.info);
        formik.setValues({
          username: res.data.info.username,
          email: res.data.info.email,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, [user]);

  return (
    <div className=" w-full h-screen flex flex-col items-center p-8 lg:flex-row lg:justify-evenly">
      <Link to="/user/profile" className="text-2xl text-green-500 self-start">
        <i className="fa-regular fa-arrow-left"></i>
      </Link>
      <form
        onSubmit={formik.handleSubmit}
        className="lg:bg-white rounded-lg w-full flex flex-col px-6 items-center lg:w-3/4 lg:h-3/4 lg:mr-4 lg:py-12 lg:flex-row"
      >
        <div className="lg:w-2/4 lg:h-3/4 lg:mr-4 flex flex-col justify-center items-center">
          <h1 className="text-black text-xl lg:hidden">My Profile</h1>
          <div className="rounded-full object-cover w-56 h-56 my-4 img-card lg:w-80 lg:h-80">
            <FilePond
              files={files}
              onupdatefiles={setFiles}
              allowMultiple={true}
              acceptedFileTypes={["image/*"]}
              //instantUpload={false}
              stylePanelLayout="compact circle"
              required={true}
              maxFiles={1}
              name="files"
              labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            />
          </div>
          <p className="text-black text-center text-xl">
            {dataProfile.username}
          </p>
        </div>
        <div className="w-full lg:w-2/4 lg:h-3/4">
          <h1 className="text-black text-xl invisible lg:visible">
            My Profile
          </h1>

          <p className="text-black text-base mb-2 mt-4 justify-self-start self-start">
            Username
          </p>
          <input
            type="text"
            name="username"
            className="w-full px-2 py-2 mb-5 text-base text-black placeholder-gray-500 border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green focus:outline-none rounded-md "
            placeholder={dataProfile.username}
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          <p className="text-black text-base mb-2 mt-4 justify-self-start self-start">
            Email
          </p>
          <input
            type="text"
            name="email"
            className="w-full px-2 py-2 mb-5 text-base text-black placeholder-gray-500 border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green focus:outline-none rounded-md "
            placeholder={dataProfile.email}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="w-4/6 px-6 py-2 mt-4 text-white bg-greenr rounded-lg focus:bg-primary-400 text-lg"
            >
              Confirm Changes
            </button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ProfileEdit;
