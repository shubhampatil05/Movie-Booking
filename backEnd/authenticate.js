const jwt = require("jsonwebtoken");
const userSchema = require("./models/userSchema");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser("imshubhampatilfrombrainworkspuneindia"));

const authenticate = async (req, res, next) => {
  req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "bearer";

  const token = req.headers.authorization.split(" ")[1];

  // const token =  req.headers["authorization"];
  console.log("Authenticate Side Varification Token", token);
  if (!token) {
    return res.status(401).json("No Token Found");
  }

  try {
    jwt.verify(
      token,
      "imshubhampatilfrombrainworkspuneindia",
      (err, payload) => {
        if (err) {
          return res.status(403).json({ message: "Invalid Token" });
        }
        req.user = {
          id: payload.id,
          token: token,
        };
      }
    );

    const rootUser = await userSchema.findOne({ id: req.user });
    if (!rootUser) {
      throw new Error("User Not Found");
    }
    console.log(rootUser);
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = authenticate;
