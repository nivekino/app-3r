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
      .get(`admin/dictionary/${id}`, { Authorization: `JWT ${user.token}` })
      .then((res) => {
        console.log(res.data.dictionary);
        setInfo(res.data.dictionary);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user, id]);

  return (
    <div className="h-screen items-center w-full flex flex-col lg:flex-row">
      <div className="bg-white item w-10/12 h-auto p-4 shadow mb-6 rounded lg:w-6/12 flex flex-col justify-center items-center relative lg:shadow-none">
        <Link to="/admin/dictionary" className="text-3xl text-green-500 self-start">
          <i className="fa-regular fa-arrow-left"></i>
        </Link>
        <h2 className="text-greencard font-bold text-sm lg:justify-self-start lg:self-start lg:text-2xl capitalize">
          {info.category}
        </h2>
        <h2 className="text-black font-bold text-2xl lg:justify-self-start lg:self-start lg:text-5xl capitalize">
          {info.name}
        </h2>

        <img
          className="object-inner w-60 h-60 my-4 img-card lg:px-2 lg:w-96 lg:h-96"
          src={info.image}
          alt="books"
        />

        <p className="text-greenr mx-4 text-xl mt-1 font-semibold lg:justify-self-start lg:self-start lg:text-2xl">
          What is it?
        </p>
        <p className="text-black text-base text-semibold px-4 text-center lg:px-24 pb-10 lg:text-xl">
          {info.whatis}
        </p>
        <img
          className="rounded-full object-cover w-10 h-10 img-card absolute bottom-2 left-4"
          src={logo}
          alt=""
        />
      </div>
      <div className="bg-greencard rounded w-10/12 h-auto lg:w-6/12 lg:h-screen p-4 flex flex-col justify-center items-center lg:justify-evenly">
        <div className="bg-white rounded-lg w-11/12 px-4 py-8 mb-4">
          <p className="text-black font-bold text-xs lg:text-3xl">Recycle</p>
          <p className="text-black text-center text-xs lg:text-xl">
            {info.recycle}
          </p>
        </div>
        <div className="bg-white rounded-lg w-11/12 px-4 py-8 mb-4 ">
          <p className="text-black font-bold text-xs lg:text-3xl">Reuse</p>
          <p className="text-black text-center text-xs lg:text-xl">
            {info.reuse}
          </p>
        </div>
        <div className="bg-white rounded-lg w-11/12 px-4 py-8">
          <p className="text-black font-bold text-xs lg:text-3xl">Reduce</p>
          <p className="text-black text-center text-xs lg:text-xl">
            {info.reduce}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DictionaryDetails;
