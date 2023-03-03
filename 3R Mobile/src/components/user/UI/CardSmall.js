import React from "react";
import { Link } from "react-router-dom";

const CardSmall = ({ category, title, image, link }) => {
  return (
    <div className="relative flex flex-col items-center justify-center w-5/12 p-4 my-3 bg-white rounded shadow lg:w-2/12">
      <p className="self-start text-lg font-light text-center text-green-500 capitalize">
        {category || "Other"}
      </p>
      <p className="text-base font-light text-center text-gray-800">{title}</p>
      <img
        src={image}
        alt="bag"
        className="object-contain object-center w-full h-32 mt-5 rounded-md"
      />
      {link !== "no" && (
        <Link
          to={`/${link}`}
          className="font-bold text-center text-green-500 lg:text-xl lg:mt-4"
        >
          Read more...
        </Link>
      )}
    </div>
  );
};

export default CardSmall;
