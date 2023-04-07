import React, { useEffect, useState } from "react";
import axios from "axios";
const MyBookings = () => {
  const [data, setData] = useState();

  const getData = async () => {
    const res = await fetch("http://localhost:5200/bookingDetails", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();
    setData(result);
  };
  //   console.log(data);

  useEffect(() => {
    getData();
  }, [data]);

  const userEmail = JSON.parse(localStorage.getItem("userEmail"));

  let bookings;

  bookings =
    data &&
    data.filter((item) => {
      return item.paymentBy === userEmail;
    });

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5200/bookingDetails/${id}`)
      .then((res) => {
        console.log("Booking Cancel Successfully", res.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="my-bookings">
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th>Movie</th>
            <th>City</th>
            <th>Theatre</th>
            <th>Time</th>
            <th>Paid Amount</th>
            <th>Seats</th>
            <th>Cancel Booking</th>
          </tr>
        </thead>

        <tbody>
          {bookings &&
            bookings.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item.movie}</td>
                  <td>{item.city}</td>
                  <td>{item.theatre}</td>
                  <td>{item.time}</td>
                  <td>{item.total}</td>
                  <td>
                    {item.seatName.map((seat) => {
                      return (
                        <span key={seat} style={{ margin: "1px" }}>
                          {`A${seat},`}
                        </span>
                      );
                    })}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(item._id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default MyBookings;
