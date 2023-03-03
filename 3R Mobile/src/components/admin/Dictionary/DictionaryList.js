import React, { useEffect, useState, useContext } from "react";
import CardSmall from "../UI/CardSmall";
import { Link } from "react-router-dom";
import httpClient from "../../../services/services";
import { loadProgressBar } from "axios-progress-bar";
import "axios-progress-bar/dist/nprogress.css";
import { AuthContext } from "../../../auth/AuthContext";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";

const DictionaryList = () => {
  const [dictionaries, setDictionaries] = useState([]);
  const [search, setSearch] = useState({});
  const { user } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values) => {
      setSearch(values);
    },
  });

  useEffect(() => {
    httpClient
      .post("admin/dictionary/getAllDictionary", search, {
        Authorization: `JWT ${user.token}`,
      })
      .then((res) => {
        setDictionaries(res.data.dictionary);
        loadProgressBar();
      });
  }, [search, user]);

  const deleteItem = (id) => {
    httpClient
      .delete(`admin/dictionary/deleteDictionary/${id}`, {
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
      });
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 mx-auto lg:w-11/12">
      <h3 className="text-3xl font-semibold text-gray-800">3R Dictionary</h3>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col items-center justify-center w-full h-full lg:justify-evenly lg:flex-row lg:w-9/12"
      >
        <input
          type="text"
          name="search"
          placeholder="search"
          onChange={formik.handleChange}
          value={formik.values.search}
          className="w-full px-2 py-2 mt-5 text-base text-black placeholder-gray-500 border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green focus:outline-none rounded-md lg:w-8/12 "
        />

        <button
          type="submit"
          className="w-full px-12 py-2 mt-4 text-white bg-green-500 rounded lg:w-3/12 focus:bg-primary-400"
        >
          Search
        </button>
      </form>

      <div className="flex flex-row flex-wrap items-center w-full mt-5 justify-evenly lg:w-11/12">
        {dictionaries.length > 0 ? (
          dictionaries.map((dictionary) => (
            <CardSmall
              image={dictionary.image}
              title={dictionary.name}
              key={dictionary._id}
              category={dictionary.category}
              link={`admin/dictionary/detail/${dictionary._id}`}
              deleteFn={() => deleteItem(dictionary._id)}
            />
          ))
        ) : (
          <div className="w-full text-center">
            <h3 className="text-2xl font-semibold text-gray-800">
              No words Found
            </h3>
          </div>
        )}
      </div>

      <Link
        to="/admin/dictionary/create"
        className="fixed flex items-center justify-center w-12 h-12 text-white bg-green-500 rounded-full bottom-5 right-5"
      >
        <i className="text-2xl fa-solid fa-plus"></i>
      </Link>
      <ToastContainer />
    </div>
  );
};

export default DictionaryList;
