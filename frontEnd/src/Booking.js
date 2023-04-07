import React, { useState } from "react";

import { useNavigate } from "react-router";

const Booking = () => {
  const [city, setCity] = useState("");

  const navigate = useNavigate();
  const handleCity = (e) => {
    setCity(e.target.value);
    navigate(e.target.value);
  };

  return (
    <div className="booking">
      <select
        onClick={handleCity}
        style={{ borderRadius: "5px", textAlign: "center" }}
      >
        <option value="" selected disabled>
          Select City
        </option>
        <option value="Pune">Pune</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Banglore">Banglore</option>
      </select>
    </div>
  );
};

export default Booking;
