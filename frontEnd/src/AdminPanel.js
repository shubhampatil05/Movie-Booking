import React, { useState, useEffect } from "react";

const AdminPanel = ({ setKeys }) => {
  const [user, setUser] = useState();
  const getUser = async () => {
    const res = await fetch("http://localhost:5200/bookingDetails", {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
        "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS",
      },
    });

    let result = await res.json();

    setUser(result);
  };

  useEffect(() => {
    getUser();
    setKeys(false);
  }, []);

  return (
    <>
      <div>
        <table
          className="table table-striped table-dark "
          style={{ textAlign: "center", width: "100%" }}
        >
          <thead>
            <tr>
              <th>Movie</th>
              <th>Theatre</th>
              <th>City</th>
              <th>Time</th>
              <th>Paid Amount</th>
              <th>PaymentBy</th>
              <th>Seats</th>
            </tr>
          </thead>

          <tbody>
            {user &&
              user.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.movie}</td>
                    <td>{item.theatre}</td>
                    <td>{item.city}</td>
                    <td>{item.time}</td>
                    <td>{item.total}</td>
                    <td>{item.paymentBy}</td>
                    <td>
                      {item.seatName.map((seat) => {
                        return (
                          <span style={{ margin: "1px" }}>{`A${seat}`}</span>
                        );
                      })}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminPanel;
