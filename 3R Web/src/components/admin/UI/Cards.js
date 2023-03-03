import React, { useContext } from "react";
import httpClient from "../../../services/services";
import { AuthContext } from "../../../auth/AuthContext";
import { loadProgressBar } from "axios-progress-bar";
import { toast } from "react-toastify";
import CardItem from "../../ui/CardItem";

const Cards = ({ idBook, title, author, publishedYear, genre, stock, image }) => {
  const { user } = useContext(AuthContext);

  const requestBooking = (idBook) => {
    const body = {
      idBook,
      idStudent: user.userId,
    };
    //body);
    httpClient
      .post(`student/books/requestedBook`, body, {
        Authorization: `JWT ${user.token}`,
      })
      .then((res) => {
        const { message } = res.data;
        toast.success(message, {
          position: "top-right",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        loadProgressBar();
      });
  };

  return (
    <>
      <CardItem
        idBook={idBook}
        title={title}
        author={author}
        publishedYear={publishedYear}
        genre={genre}
        stock={stock}
        requestBooking={requestBooking}
        image={image}
      />
    </>
  );
};

export default Cards;
