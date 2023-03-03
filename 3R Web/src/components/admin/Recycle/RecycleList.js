import React, { useEffect, useState, useContext } from "react";
import CardSmall from "../UI/CardSmall";
import { Link } from "react-router-dom";
import httpClient from "../../../services/services";
import { loadProgressBar } from "axios-progress-bar";
import "axios-progress-bar/dist/nprogress.css";
import { AuthContext } from "../../../auth/AuthContext";
import { ToastContainer, toast } from "react-toastify";

const RecycleList = () => {
  const [recycle, setRecycle] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    httpClient
      .get("admin/recycles/getAllRecycles", {
        Authorization: `JWT ${user.token}`,
      })
      .then((res) => {
        console.log(res.data.recicle);
        setRecycle(res.data.recicle);
        loadProgressBar();
      });
  }, [user]);

  const deleteRecycle = (id) => {
    httpClient
      .delete(`admin/recycles/deleteRecycle/${id}`, {
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
        }, 1000);
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
  };

  return (
    <div className="flex flex-col items-center justify-start p-4 mx-auto lg:w-11/12 h-screen">
      <h3 className="text-3xl font-semibold text-gray-800">My Recycle List</h3>

      <div className="flex flex-row flex-wrap items-center w-full mt-5 justify-evenly lg:w-11/12">
        {recycle.length > 0 ? (
          recycle.map((recycle) => {
            return (
              <CardSmall
                key={recycle._id}
                title={recycle.name}
                image={recycle.image}
                category={recycle.typeProduct}
                deleteFn={() => deleteRecycle(recycle._id)}
              />
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center w-full">
            <h3 className="text-3xl font-semibold text-gray-800">
              No Recycles
            </h3>
          </div>
        )}
      </div>

      <Link
        to="/admin/recycle/create"
        className="fixed flex items-center justify-center w-12 h-12 text-white bg-green-500 rounded-full bottom-5 right-5"
      >
        <i className="text-2xl fa-solid fa-plus"></i>
      </Link>
      <ToastContainer />
    </div>
  );
};

export default RecycleList;
