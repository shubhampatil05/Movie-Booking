const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("./models/userSchema");
app.use(express.json());
const cors = require("cors");
const isAdmin = require("./isAdmin");
const authenticate = require("./authenticate");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const bookingModel = require("./models/bookingSchema");

// app.options('*', cors())
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

mongoose.set("strictQuery", true);

mongoose.connect("mongodb://localhost:27017/Booking");

app.post("/signUp", async (req, res) => {
  const {
    firstName,
    lastName,
    phone,
    email,
    userName,
    password,
    confirmPassword,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !phone ||
    !email ||
    !userName ||
    !password ||
    !confirmPassword
  ) {
    res.status(422).json({ error: "Fill The All Fields" });
  }
  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      res.status(422).json({
        error: "User Already Exist",
      });
    } else if (password !== confirmPassword) {
      res.status(422).json({ message: "Password Dosen't Match" });
    } else {
      const data = new User(req.body);
      const result = await data.save();
      res.status(201).json({ message: "Ragistered Successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/logIn", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    let token = await user.generateAuthToken();

    res
      .status(200)
      .send({ data: token, message: "You Have Logged in Successfully", user });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.get("/movies/:moviesName", async (req, res) => {
  let data = await movies.find();
  res.send(data);
});

app.post("/admin", isAdmin, async (req, res) => {
  // let token = await user.generateAuthToken();
  // res.status(200).send({ data: token, message: "You Have Admin Access" });

  return User.find().then((data) => {
    return res.json(data);
  });
});

app.post("/bookingDetails", authenticate, async (req, res) => {
  // console.log(req.body);
  const data = new bookingModel(req.body);
  const result = await data.save();
});

app.get("/bookingDetails", async (req, res) => {
  return bookingModel.find().then((data) => {
    return res.json(data);
  });
});

app.delete("/bookingDetails/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    // console.log(itemId);

    const data = await bookingModel.findById({ _id: itemId });

    // console.log(data);
    // res.send(data);

    if (!data) {
      res.status(400).json({ message: "Booking Not Found" });
    }

    const result = await bookingModel.deleteOne({ _id: itemId });
    // res.send(result);

    console.log("Deleted Succesfully");
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/adminpanel", (req, res) => {
  return bookingModel.find().then((data) => {
    return res.json(data);
  });
});

app.listen(5200, (err) => {
  console.log("Server Started");
  if (err) {
    console.log(err);
  }
});
