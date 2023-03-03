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
    <div className="bg-amber-100 w-full h-screen flex items-center justify-center lg:pt-20">
      <div className="bg-white w-11/12 p-4 rounded-xl relative my-4 lg:mt-8 lg:h-6/6">
        <Link to="/admin/reuse" className="text-3xl text-green-500">
          <i className="fa-regular fa-arrow-left"></i>
        </Link>
        <h1 className="text-black text-3xl font-bold lg:text-5xl">
          {info?.title}
        </h1>
        <p className="text-greenr text-xl lg:mt-6 font-semibold lg:px-16">
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
              className="rounded-full object-cover w-60 h-60 my-4 img-card lg:px-2 lg:w-96 lg:h-96"
              src={info.source}
              alt="books"
            />
          )}
        </div>
        <p className="text-greenr mx-4 text-xl mt-1 font-semibold lg:px-32">
          What is it?
        </p>
        <p className="text-black text-base text-semibold px-4 text-center lg:px-64 pb-10">
          {info?.description}
        </p>
        <img
          className="rounded-full object-cover w-10 h-10 img-card absolute bottom-2 left-4"
          src={logo}
          alt=""
        />
      </div>
    </div>
  );
};

export default ReuseDetail;
