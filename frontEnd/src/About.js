import React, { createContext, useEffect, useState } from "react";
import { json, useLocation, useNavigate } from "react-router";
import Seats from "./Seats";

const About = () => {
  const [info, setInfo] = useState({
    city: "pune",
    theatre: "",
    time: "",
  });

  const location = useLocation();
  const movie = location.pathname.split("/")[2];
  // console.log(movie);

  const [pp, setPP] = useState();
  const [gp, setGP] = useState();
  const [seatName, setSeatName] = useState([]);
  const [total, setTotal] = useState(0);

  const [dbData, setDbData] = useState([]);

  const navigate = useNavigate();
  const handleData = async (e) => {
    const { name, value } = e.target;

    setInfo({
      ...info,
      [name]: value,
    });

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
    setDbData(result);

    localStorage.setItem("dbdata", JSON.stringify(result));
  };

  const showTheatre = () => {
    if (info.city === "pune") {
      return (
        <div className="theatre">
          <select
            style={{ borderRadius: "5px", width: "200px" }}
            name="theatre"
            value={info.theatre}
            onChange={handleData}
          >
            <option value="" selected disabled>
              Select Theatre
            </option>
            <option value="Abhiruchi City Pride">Abhiruchi City Pride</option>
            <option value="Victory Theatre">Victory Theatre</option>
            <option value="PVR Kumar Pacific Mall">
              PVR Kumar Pacific Mall
            </option>
            <option value="PVR Icon Pavlilion Mall">
              PVR Icon Pavilion Mall
            </option>
            <option value="Cinépolis - WestEnd Mall">
              Cinépolis - WestEnd Mall
            </option>
          </select>
        </div>
      );
    } else if (info.city === "mumbai") {
      return (
        <div className="theatre">
          <select
            style={{ borderRadius: "5px", width: "200px" }}
            name="theatre"
            value={info.theatre}
            onChange={handleData}
          >
            <option value="" selected disabled>
              Select Theatre
            </option>
            <option value="PVR Icon Infinite">PVR Icon Infinite</option>
            <option value="Carnival Cinemas Libarty">
              Carnival Cinemas Libarty
            </option>
            <option value="Gold Cinemas Bandra">Gold Cinemas Bandra</option>
            <option value="Maison PVR">Maison PVR</option>
            <option value="Carnival Cinemas IMAX">Carnival Cinemas IMAX</option>
          </select>
        </div>
      );
    } else if (info.city === "banglore") {
      return (
        <div className="theatre">
          <select
            style={{ borderRadius: "5px", width: "200px" }}
            name="theatre"
            value={info.theatre}
            onChange={handleData}
          >
            <option value="" selected disabled>
              Select Theatre
            </option>
            <option value="The Nexus Mal">The Nexus Mall</option>
            <option value="MSR Elements Mall">MSR Elements Mall</option>
            <option value="Cauvery Theatre">Cauvery Theatre</option>
            <option value="Kavya Theatre">Kavya Theatre</option>
            <option value="Anupama Theatre">Anupama Theatre</option>
          </select>
        </div>
      );
    }
  };

  const proceedPayment = async () => {
    const bookingInfo = localStorage.setItem(
      "bookingInfo",
      JSON.stringify({ info, movie, total, seatName })
    );

    // console.log(bookingInfo);

    if (info.city === "") {
      alert("Please Select City");
    } else if (info.theatre === "") {
      alert("Please Select Theatre");
    } else if (info.time === "") {
      alert("Please Select Time");
    } else if (total === 0) {
      alert("Please Select Seats");
    } else {
      navigate(location.pathname + "/payment");
    }
  };

  return (
    <div className="about" style={{ backgroundColor: "aliceblue" }}>
      <div className="booking-details">
        <div className="select-city">
          <label htmlFor="" style={{ marginTop: "10px" }}>
            Select City..
          </label>
          <select
            onChange={handleData}
            name="city"
            value={info.city}
            style={{
              marginBottom: "10px",
              width: "200px",
              borderRadius: "5px",
            }}
          >
            <option value="pune" selected>
              Pune
            </option>
            <option value="mumbai">Mumbai</option>
            <option value="banglore">Banglore</option>
          </select>
        </div>
        <div className="select-theatre">
          <label htmlFor="" style={{ fontWeight: "bold" }}>
            Select Theatre..
          </label>
          {showTheatre()}
        </div>

        <div className="select-time">
          <label htmlFor="" style={{ fontWeight: "bold" }}>
            Select Time..
          </label>

          <select
            onChange={handleData}
            name="time"
            value={info.time}
            style={{
              width: "200px",
              borderRadius: "5px",
            }}
          >
            <option value="" selected disabled>
              Select Time
            </option>
            <option value="09:30AM">09:30AM</option>
            <option value="12:30PM">12:30PM</option>
            <option value="06:30PM">06:30PM</option>
            <option value="09:30PM">09:30PM</option>
          </select>
        </div>
      </div>

      <div className="selected-movie-details">
        {seatName.length > 0 ? (
          <div className="a">
            <h4 className="b"> Your Seat :</h4>

            {seatName &&
              seatName.map((item, index) => {
                return (
                  <div key={index}>
                    <h4 className="c">{`A${item},`}</h4>
                  </div>
                );
              })}
          </div>
        ) : null}
        <div className="d">
          {total > 0 ? (
            <div>
              <h4 style={{ fontWeight: "bold" }}>Payable Amount : {total}</h4>
            </div>
          ) : null}
        </div>
      </div>

      <Seats
        setPP={setPP}
        setGP={setGP}
        seatName={seatName}
        setSeatName={setSeatName}
        setTotal={setTotal}
        dbData={dbData}
        city={info.city}
        time={info.time}
        theatre={info.theatre}
      />

      <button
        className="btn btn-dark mt-3"
        style={{ width: "200px" }}
        onClick={proceedPayment}
      >
        Proceed To Payment
      </button>

      <div className="seat-chart">
        <div className="available">
          <div className="available-seats"></div>
          <h6 className="available-text">Available</h6>
        </div>
        <div className="booked">
          <div className="booked-seats"></div>
          <h6 className="booked-text">Sold Seat</h6>
        </div>
        <div className="selected">
          <div className="selected-seats"></div>
          <h6 className="selected-text">Selected</h6>
        </div>
      </div>
    </div>
  );
};

export default About;
