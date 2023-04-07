import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import HomeIcon from "@mui/icons-material/Home";

const Navbar = ({ setKeys, name }) => {
  // console.log(keys);
  // console.log(auth);

  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = localStorage.getItem("isAdmin");
  const token = localStorage.getItem("jwtToken");

  if (location.pathname === "/singUp" || location.pathname === "/logIn") {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("bookingInfo");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("poster");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("dbdata");
    localStorage.removeItem("isAdmin");
  }

  const handleBack = () => {
    // console.log("Clicked");
    navigate(-1);
  };

  const handleClick = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("bookingInfo");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("poster");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("dbdata");
    localStorage.removeItem("isAdmin");
  };

  return (
    <div className="Nav">
      <img
        src="https://logos.textgiraffe.com/logos/logo-name/33408590-designstyle-girlish-l.png"
        alt="logo"
        style={{
          width: "175px",
          height: "75px",
          marginLeft: "20px",
        }}
      />

      <div
        className="buttons"
        style={{
          width: "500px",
        }}
      >
        {token || isAdmin ? (
          <>
            <Link
              to="/myBookings"
              className="btn btn-light"
              style={{ width: "120px" }}
            >
              MyBookings
            </Link>

            <Link to="/movie" className="btn btn-dark">
              Home
            </Link>
            <button className="btn btn-secondary" onClick={handleBack}>
              Back
            </button>

            <Link
              to="/logIn"
              className="btn btn-danger"
              style={{ width: "150px" }}
              onClick={handleClick}
            >
              Logout{`(${name})`}
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/"
              className="btn btn-danger"
              onClick={() => setKeys(true)}
            >
              Signup
            </Link>
            <Link to="/logIn" className="btn btn-success">
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
