import React, { useEffect, useState, useContext } from "react";
import logo from "../../../images/Vector.png";
import { useParams } from "react-router-dom";
import httpClient from "../../../services/services";
import { AuthContext } from "../../../auth/AuthContext";
import { Link } from "react-router-dom";

const DictionaryDetails = () => {
  const { id } = useParams();
  const [info, setInfo] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    httpClient
      .get(`user/dictionary/${id}`, { Authorization: `JWT ${user.token}` })
      .then((res) => {
        console.log(res.data.dictionary);
        setInfo(res.data.dictionary);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user, id]);

  return (
    <div className="flex flex-col items-center w-full h-screen lg:flex-row">
      <div className="relative flex flex-col items-center justify-center w-10/12 h-auto p-4 mb-6 bg-white rounded shadow item lg:w-6/12 lg:shadow-none">
        <Link to="/user/dictionary" className="self-start text-3xl text-green-500">
          <i className="fa-regular fa-arrow-left"></i>
        </Link>
        <h2 className="text-sm font-bold capitalize text-greencard lg:justify-self-start lg:self-start lg:text-2xl">
          {info.category}
        </h2>
        <h2 className="text-2xl font-bold text-black capitalize lg:justify-self-start lg:self-start lg:text-5xl">
          {info.name}
        </h2>

        <img
          className="my-4 object-inner w-60 h-60 img-card lg:px-2 lg:w-96 lg:h-96"
          src={info.image}
          alt="books"
        />

        <p className="mx-4 mt-1 text-xl font-semibold text-greenr lg:justify-self-start lg:self-start lg:text-2xl">
          What is it?
        </p>
        <p className="px-4 pb-10 text-base text-center text-black text-semibold lg:px-24 lg:text-xl">
          {info.whatis}
        </p>
        <img
          className="absolute object-cover w-10 h-10 rounded-full img-card bottom-2 left-4"
          src={logo}
          alt=""
        />
      </div>
      <div className="flex flex-col items-center justify-center w-10/12 h-auto p-4 rounded bg-greencard lg:w-6/12 lg:h-screen lg:justify-evenly">
        <div className="w-11/12 px-4 py-8 mb-4 bg-white rounded-lg">
          <p className="text-xs font-bold text-black lg:text-3xl">Recycle</p>
          <p className="text-xs text-center text-black lg:text-xl">
            {info.recycle}
          </p>
        </div>
        <div className="w-11/12 px-4 py-8 mb-4 bg-white rounded-lg ">
          <p className="text-xs font-bold text-black lg:text-3xl">Reuse</p>
          <p className="text-xs text-center text-black lg:text-xl">
            {info.reuse}
          </p>
        </div>
        <div className="w-11/12 px-4 py-8 bg-white rounded-lg">
          <p className="text-xs font-bold text-black lg:text-3xl">Reduce</p>
          <p className="text-xs text-center text-black lg:text-xl">
            {info.reduce}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DictionaryDetails;
