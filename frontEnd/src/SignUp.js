import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = ({ setKeys }) => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const [user, setUser] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });

    if (!/^[a-zA-Z]*$/.test(data.firstName)) {
      setData({ ...data, firstName: data.firstName.slice(0, -1) });
    }

    if (!/^[a-zA-Z]*$/.test(data.lastName)) {
      setData({ ...data, lastName: data.lastName.slice(0, -1) });
    }

    if (!/^\d*$/.test(data.phone)) {
      setData({ ...data, phone: data.phone.slice(0, -1) });
    }
  };

  const handleValidation = () => {
    if (!/^[a-zA-Z]*$/.test(data.firstName)) {
      setData({ ...data, firstName: data.firstName.slice(0, -1) });
    }

    if (!/^[a-zA-Z]*$/.test(data.lastName)) {
      setData({ ...data, lastName: data.lastName.slice(0, -1) });
    }

    if (!/^\d*$/.test(data.phone)) {
      setData({ ...data, phone: data.phone.slice(0, -1) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let Email = data.email;
    let At = Email.indexOf("@");
    let Dot = Email.indexOf(".");
    if (At < 1 || Dot < At + 2 || Dot + 2 >= Email.length) {
      alert("Enter Valid Email");
      return false;
    }

    // console.log(data);

    // --Back End Connection--

    const {
      firstName,
      lastName,
      phone,
      email,
      userName,
      password,
      confirmPassword,
    } = data;

    const res = await fetch("http://localhost:5200/signUp", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        firstName,
        lastName,
        phone,
        email,
        userName,
        password,
        confirmPassword,
      }),
    });

    const result = await res.json();

    const message = await result.message;
    const error = await result.error;

    if (message === "User Already Exist") {
      alert("User Already Exist");
    } else if (error === "Password Dosen't Match") {
      alert("Password Dosen't Match");
    } else if (message === "Ragistered Successfully") {
      alert("Ragistered Successfully");

      setData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        userName: "",
        password: "",
        confirmPassword: "",
      });
      setKeys(true);
      navigate("/login");
    }
  };

  const getUser = async () => {
    const res = await fetch("http://localhost:5200/signUp", {
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
  });

  return (
    <div className="signup mt-3">
      <form onSubmit={handleSubmit} className="signup-form">
        <span className="text-danger" style={{ fontWeight: "bold" }}>
          {" "}
          Firstname*{" "}
        </span>

        <input
          className="form-control"
          type="text"
          required
          maxLength="10"
          autoComplete="off"
          placeholder="Enter FirstName"
          name="firstName"
          value={data.firstName}
          onChange={handleChange}
          onKeyUp={handleValidation}
        />

        <span className="text-danger" style={{ fontWeight: "bold" }}>
          {" "}
          Lastname*{" "}
        </span>
        <input
          className="form-control"
          type="text"
          required
          maxLength="10"
          autoComplete="off"
          placeholder="Enter LastName"
          name="lastName"
          value={data.lastName}
          onChange={handleChange}
          onKeyUp={handleValidation}
        />

        <span className="text-danger" style={{ fontWeight: "bold" }}>
          {" "}
          Phone No*{" "}
        </span>
        <input
          className="form-control"
          type="text"
          required
          maxLength="10"
          minLength="10"
          autoComplete="off"
          placeholder="Enter Phone No"
          name="phone"
          value={data.phone}
          onChange={handleChange}
          onKeyUp={handleValidation}
        />

        <span className="text-danger" style={{ fontWeight: "bold" }}>
          {" "}
          E-mail*{" "}
        </span>
        <input
          className="form-control"
          type="email"
          required
          maxLength="30"
          autoComplete="off"
          placeholder="Enter E-Mail"
          name="email"
          value={data.email}
          onChange={handleChange}
          onKeyUp={handleValidation}
        />

        <span className="text-danger" style={{ fontWeight: "bold" }}>
          {" "}
          Username*{" "}
        </span>
        <input
          className="form-control"
          type="text"
          required
          maxLength="12"
          autoComplete="off"
          placeholder="Enter UserName"
          name="userName"
          value={data.userName}
          onChange={handleChange}
          onKeyUp={handleValidation}
        />

        <span className="text-danger" style={{ fontWeight: "bold" }}>
          {" "}
          Password* :{" "}
        </span>
        <input
          type="password"
          className="form-control"
          required
          maxLength="12"
          autoComplete="off"
          placeholder="Enter Password"
          name="password"
          value={data.password}
          onChange={handleChange}
          onKeyUp={handleValidation}
        />

        <span className="text-danger" style={{ fontWeight: "bold" }}>
          {" "}
          Confirm Password*{" "}
        </span>
        <input
          type="password"
          className="form-control"
          required
          maxLength="12"
          autoComplete="off"
          placeholder="Re-Enter Password"
          name="confirmPassword"
          value={data.confirmPassword}
          onChange={handleChange}
          onKeyUp={handleValidation}
        />

        <div>
          <input
            type="submit"
            value="Ragister"
            className="btn btn-primary"
            style={{ marginBottom: "5px", width: "100px" }}
          />
        </div>
      </form>
    </div>
  );
};

export default SignUp;
