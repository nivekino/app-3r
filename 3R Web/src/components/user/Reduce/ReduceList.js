import React, { useEffect, useState, useContext } from "react";
import CardsAdmin from "../../ui/CardsAdmin";
import { AuthContext } from "../../../auth/AuthContext";
import httpClient from "../../../services/services";
import { loadProgressBar } from "axios-progress-bar";
import "axios-progress-bar/dist/nprogress.css";
import { Link } from "react-router-dom";

const ReduceList = () => {
  const [reduce, setReduce] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      httpClient
        .get(`user/reduces/getAllReduces`, {
          Authorization: `JWT ${user.token}`,
        })
        .then((res) => {
          setReduce(res.data.reduce);
          loadProgressBar();
        });
    };
    fetchData();
  }, [user]);

  return (
    <div className="w-full px-8 py-5">
      <h1 className="pt-4 font-bold text-center lg:text-5xl">REDUCE</h1>
      <div className="flex flex-row flex-wrap px-2 justify-evenly lg:justify-evenly">
        {reduce.length > 0 ? (
          reduce.map((reduce) => (
            <CardsAdmin
              key={reduce._id}
              title={reduce.title}
              hash1={reduce.hashtag1}
              hash2={reduce.hashtag2}
              image={reduce.source}
              thumbnail={reduce.thumbnail}
              link={`user/reduce/detail/${reduce._id}`}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h1 className="pt-4 font-bold text-center lg:text-5xl">
              No Reduce Found
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

export default ReduceList;
