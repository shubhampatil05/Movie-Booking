import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { Data } from "./Data";

const View = () => {
  const param = useParams();
  const [data, setData] = useState();
  const navigate = useNavigate();

  const Movies = () => {
    const getMovie =
      Data &&
      Data.find((item) => {
        return item.title === param.title;
      });

    setData(getMovie);
  };

  useEffect(() => {
    Movies();
  }, []);

  localStorage.setItem("poster", JSON.stringify(data?.img));
  const handleTicket = () => {
    navigate(`/movie/${param.title}/seatBooking`);
  };

  return (
    <div className="view">
      <div className="movie-details">
        <img className="img-details" src={data && data?.img} />

        <div className="title-button">
          <h3>Movie : {data && data?.title}</h3>
          <h3>Rating : {data && data?.rating}</h3>
          <h3>{data && data?.time}</h3>
          <button
            className="btn btn-outline-dark book-ticket"
            onClick={handleTicket}
          >
            Book Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default View;
