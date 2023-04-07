import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

const BookedTicket = () => {
  const location = useLocation();

  const bookingDetails = JSON.parse(localStorage.getItem("bookingInfo"));
  const moviePoster = JSON.parse(localStorage.getItem("poster"));

  // console.log(bookingDetails);
  // console.log(location.pathname);

  const [bookingData, seatBookigData] = useState();

  const getData = async () => {
    const res = await fetch("http://localhost:5200/bookingDetails", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();
    seatBookigData(result);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="ticked-booked">
      <div className="card-infos">
        <div className="card-details" style={{ width: "50%" }}>
          <h5>Movie* : {bookingDetails.movie}</h5>
          <h5>City* : {bookingDetails.info.city}</h5>
          <h5>Theatre* : {bookingDetails.info.theatre}</h5>
          <h5>Time* : {bookingDetails.info.time}</h5>
          <h5>
            SeatName* :{" "}
            {bookingDetails.seatName.map((item) => (
              <span style={{ margin: "1px" }}>{`A${item},`}</span>
            ))}
          </h5>
          <h5>Total* : {bookingDetails.total}</h5>
        </div>
        <div className="poster" style={{ width: "50%" }}>
          <img
            src={moviePoster}
            alt="Movie Poster"
            width="330px"
            height="385px"
            style={{ borderRadius: "10px" }}
          />
          <img
            className="stamp"
            src="https://thumbs.dreamstime.com/b/circle-retro-stamp-fully-booked-isolated-white-background-155306829.jpg"
            alt="stamp"
          />
        </div>
      </div>
    </div>
  );
};

export default BookedTicket;
