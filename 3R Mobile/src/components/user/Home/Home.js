import React, { useEffect, useState, useContext } from "react";
import CardsAdmin from "../../ui/CardsAdmin";
import { AuthContext } from "../../../auth/AuthContext";
import httpClient from "../../../services/services";
import { loadProgressBar } from "axios-progress-bar";
import "axios-progress-bar/dist/nprogress.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [info, setInfo] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      httpClient
        .get(`user/getAll`, {
          Authorization: `JWT ${user.token}`,
        })
        .then((res) => {
          setInfo(res.data.info);
          loadProgressBar();
        });
    };
    fetchData();
  }, [user]);

  return (
    <div className="w-full px-8 py-5">
      <h1 className="pt-4 font-bold text-center lg:text-5xl text-2xl">
        HELLO, <span className="text-green-500"> WELCOME</span> BACK!
      </h1>
      <p className="text-center text-xl">
        Do you want to know <span className="text-green-500">what's new?</span>
      </p>
      <div className="flex flex-row flex-wrap px-2 justify-evenly lg:justify-evenly">
        {info.length > 0 ? (
          info.map((data) => (
            <CardsAdmin
              key={data._id}
              title={data.title}
              hash1={data.hashtag1}
              hash2={data.hashtag2}
              image={data.source}
              thumbnail={data.thumbnail}
              link={`user/${data.type}/detail/${data._id}`}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h1 className="pt-4 font-bold text-center lg:text-5xl">
              No data found
            </h1>
          </div>
        )}
      </div>
      <div className="flex justify-end lg:px-20">
        <Link
          to={`/user/reduce/create`}
          className="w-10 h-10 lg:h-14 lg:w-14 py-2 rounded-full text-white bg-green-500 mt-4 btn-add fixed right-5 bottom-5 flex items-center justify-center"
        >
          <i className="fa-solid fa-plus text-xl"></i>
        </Link>
      </div>
    </div>
  );
};

export default Home;
