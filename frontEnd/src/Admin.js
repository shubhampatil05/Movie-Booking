import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Admin = ({ setName, setShowMyBooking }) => {
  const [show, setShow] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };
  const showPassword = () => {
    setShow(true);
  };

  const hidePassword = () => {
    setShow(false);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const res = await fetch("http://localhost:5200/admin", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     authorization: `bearer ${JSON.parse(localStorage.getItem("jwtToken"))}`,
    //   },
    // });

    // const result = await res.json();

    // localStorage.setItem("adminToken", JSON.stringify(result.data));

    // setAdminData(result);
    // console.log(adminData);

    // if (adminData) {
    //   navigate("/adminPanel");
    // }

    if (data.email === "admin@gmail.com" && data.password === "admin123") {
      localStorage.setItem("jwtToken", true);
      navigate("/adminPanel");
      setName("Admin");
      setShowMyBooking(false);
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="login mt-5">
      <form onSubmit={handleSubmit} className="login-form">
        <label style={{ fontWeight: "bold" }}>E-MAIL</label>
        <input
          className="form-control"
          type="email"
          required
          autoComplete="off"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
        <label style={{ fontWeight: "bold" }}>PASSWORD</label>

        <input
          className="form-control"
          type={show ? "text" : "password"}
          required
          maxLength="20"
          autoComplete="off"
          name="password"
          value={data.password}
          onChange={handleChange}
          style={{ position: "relative" }}
        />
        <span>
          <i
            className="fa-regular fa-eye"
            onMouseOver={showPassword}
            onMouseOut={hidePassword}
          />
        </span>
        <div>
          <input
            type="submit"
            value="Admin Login"
            className="btn btn-secondary"
            style={{ width: "130px" }}
          />
        </div>
      </form>
    </div>
  );
};

export default Admin;
