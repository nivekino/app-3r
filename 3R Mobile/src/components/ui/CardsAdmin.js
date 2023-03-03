import React from "react";
import { Link } from "react-router-dom";

const CardsAdmin = ({ title, hash1, hash2, image, link, thumbnail }) => {
  return (
    <>
      <div className="w-48 lg:w-96 my-8 bg-white px-4 pt-6 pb-6 rounded-xl shadow-lg">
        <p className="font-semibold text-green-500 text-center lg:text-4xl">
          {title}
        </p>
        <p className="text-gray-600 text-center lg:text-xl lg:mt-2 lg:font-semibold">
          #{hash1} #{hash2}
        </p>
        <img
          className="rounded-xl object-cover w-full h-40 my-4 img-card lg:h-80 lg:px-2"
          src={thumbnail !== "" ? thumbnail : image}
          alt="books"
        />
        <Link
          to={`/${link}`}
          className="text-center text-green-500 font-bold lg:text-xl lg:mt-4"
        >
          Read more...
        </Link>
      </div>
    </>
  );
};

export default CardsAdmin;
