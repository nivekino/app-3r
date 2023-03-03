import React from "react";
import { Link } from "react-router-dom";

const CardItem = ({ idBook, title, author, url, status, student, image }) => {
  return (
    <div className="w-1/2 md:w-1/2 lg:w-1/4 my-3">
      <Link to={`/${url}/${idBook}`}>
        <div className="flex flex-col w-10/12 mx-auto">
          <div className="w-full">
            <img
              className="rounded shadow-md object-cover w-full h-full"
              src={image}
              alt="books"
            />
          </div>
          <div className="flex flex-col mt-4">
            <p className="text-sm md:text-lg lg:text-lg text-blue-500 font-bold capitalize">
              {title}
            </p>
            <p className="text-sm md:text-lg lg:text-lg text-gray-600 mt-3 mb-3 font-light">
              by {author}
            </p>
            {student && (
              <>
                <hr></hr>
                <p className="text-sm md:text-lg lg:text-lg text-gray-600 mt-3 font-light">
                  Student name: {student}
                </p>
                <p className="text-sm md:text-lg lg:text-lg text-gray-600 mt-3 font-light">
                  status:{" "}
                  {status
                    ? (<span className="text-green-500 font-semibold">Returned</span>)
                    : (<span className="text-red-500 font-semibold">Not returned</span>)}
                </p>
              </>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardItem;
