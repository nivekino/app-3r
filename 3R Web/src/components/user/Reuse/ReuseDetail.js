import React, { useEffect, useState, useContext } from "react";
import logo from "../../../images/Vector.png";
import { useParams } from "react-router-dom";
import httpClient from "../../../services/services";
import { AuthContext } from "../../../auth/AuthContext";
import { Link } from "react-router-dom";

const ReuseDetail = () => {
  const { id } = useParams();
  const [info, setInfo] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    httpClient
      .get(`user/reuse/${id}`, { Authorization: `JWT ${user.token}` })
      .then((res) => {
        setInfo(res.data.reuse);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user, id]);

  return (
    <div className="flex items-center justify-center w-full h-screen bg-amber-100 lg:pt-20">
      <div className="relative w-11/12 p-4 my-4 bg-white rounded-xl lg:mt-8 lg:h-6/6">
        <Link to="/user/reuse" className="text-3xl text-green-500">
          <i className="fa-regular fa-arrow-left"></i>
        </Link>
        <h1 className="text-3xl font-bold text-black lg:text-5xl">
          {info?.title}
        </h1>
        <p className="text-xl font-semibold text-greenr lg:mt-6 lg:px-16">
          #{info?.hashtag1} #{info?.hashtag2}
        </p>
        <div className="flex justify-center">
          {info.thumbnail ? (
            <video
              className="w-full h-full my-5 lg:w-8/12 lg:h-96"
              controls
              src={info.source}
              type="video/mp4"
            />
          ) : (
            <img
              className="object-cover my-4 rounded-full w-60 h-60 img-card lg:px-2 lg:w-96 lg:h-96"
              src={info.source}
              alt="books"
            />
          )}
        </div>
        <p className="mx-4 mt-1 text-xl font-semibold text-greenr lg:px-32">
          What is it?
        </p>
        <p className="px-4 pb-10 text-base text-center text-black text-semibold lg:px-64">
          {info?.description}
        </p>
        <img
          className="absolute object-cover w-10 h-10 rounded-full img-card bottom-2 left-4"
          src={logo}
          alt=""
        />
      </div>
    </div>
  );
};

export default ReuseDetail;
