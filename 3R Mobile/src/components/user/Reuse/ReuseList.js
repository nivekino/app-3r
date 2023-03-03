import React, { useEffect, useState, useContext } from "react";
import CardsAdmin from "../../ui/CardsAdmin";
import { AuthContext } from "../../../auth/AuthContext";
import httpClient from "../../../services/services";
import { loadProgressBar } from "axios-progress-bar";
import "axios-progress-bar/dist/nprogress.css";
import { Link } from "react-router-dom";

const ReuseList = () => {
  const [reuse, setReuse] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      httpClient
        .get(`user/reuses/getAllReuses`, {
          Authorization: `JWT ${user.token}`,
        })
        .then((res) => {
          setReuse(res.data.reuse);
          loadProgressBar();
        });
    };

    fetchData();
  }, [user]);

  return (
    <div className="px-8 py-5 w-full">
      <h1 className="text-center font-bold lg:text-5xl pt-4">REUSE</h1>
      <div className="flex flex-row flex-wrap justify-evenly lg:justify-evenly px-2">
        {reuse.length > 0 ? (
          reuse.map((reuse) => (
            <CardsAdmin
              key={reuse._id}
              title={reuse.title}
              hash1={reuse.hashtag1}
              hash2={reuse.hashtag2}
              image={reuse.source}
              thumbnail={reuse.thumbnail}
              link={`user/reuse/detail/${reuse._id}`}
            />
          ))
        ) : (
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-center font-bold lg:text-5xl pt-4">
              No Reuses Found
            </h1>
          </div>
        )}
      </div>
      <div className="flex justify-end lg:px-20">
        <Link
          to={`/user/reuse/create`}
          className="w-10 h-10 lg:h-14 lg:w-14 py-2 rounded-full text-white bg-green-500 mt-4 btn-add fixed right-5 bottom-5 flex items-center justify-center"
        >
          <i className="fa-solid fa-plus text-xl"></i>
        </Link>
      </div>
    </div>
  );
};

export default ReuseList;
