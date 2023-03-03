import React from "react";

const CardSmall = ({ category, title, image, deleteFn }) => {
  return (
    <div className="relative flex flex-col items-center justify-center w-5/12 p-4 my-3 rounded shadow lg:w-2/12 bg-white">
      <p className="self-start text-lg font-light text-center text-green-500 capitalize">
        {category || "Other"}
      </p>
      <i
        className="absolute text-lg fa-light fa-trash-can top-4 right-4"
        onClick={() => {
          deleteFn();
        }}
      ></i>
      <p className="text-base font-light text-center text-gray-800">{title}</p>
      <img
        src={image}
        alt="bag"
        className="object-contain object-center w-full h-32 mt-5 rounded-md"
      />
    </div>
  );
};

export default CardSmall;
