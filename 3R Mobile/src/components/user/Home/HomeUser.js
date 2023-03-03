import React from "react";
import { Link } from "react-router-dom";

const HomeUser = () => {
  return (
    <div className="flex flex-col pt-12 px-6 lg:flex-row lg:justify-evenly h-screen bg-1 bg-cover bg-center lg:flex-wrap ">
      <h2 className="text-black text-3xl font-bold text-center w-full mb-4 lg:mb-0 lg:text-4xl">
        3R ACTIONS
      </h2>

      <Link
        to="/user/recycle"
        className="bg-recycleCard w-full h-40 bg-no-repeat rounded-xl flex items-center lg:rounded-xl justify-center my-4 mt-0 lg:mt-4 lg:w-96 lg:h-3/4 lg:relative"
      >
        <p className="text-black object-cover bg-center text-center text-xl font-bold lg:text-4xl lg:absolute lg:top-3 lg:left-6">
          Recycle
        </p>
      </Link>
      <Link
        to="/user/reduce"
        className="bg-reduceCard object-cover bg-no-repeat w-full h-40 rounded-xl lg:rounded-xl flex items-center justify-center my-4 lg:w-96 lg:h-3/4 lg:relative"
      >
        <p className="text-black text-center text-xl font-bold lg:text-4xl lg:absolute lg:top-3 lg:left-6">
          Reduce
        </p>
      </Link>
      <Link
        to="/user/reuse"
        className="bg-reuseCard object-cover bg-no-repeat w-full h-40 rounded-xl lg:rounded-xl flex items-center justify-center my-4 lg:w-96 lg:h-3/4 lg:relative"
      >
        <p className="text-black text-center text-xl font-bold lg:text-4xl lg:absolute lg:top-3 lg:left-6">
          Reuse
        </p>
      </Link>
    </div>
  );
};

export default HomeUser;
