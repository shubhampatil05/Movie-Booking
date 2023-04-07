const userSchema = require("./models/userSchema");
const jwt = require("jsonwebtoken");

const isAdmin = async (req, res, next) => {
  req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "bearer";

  const token = req.headers.authorization.split(" ")[1];

  // const token =  req.headers["authorization"];
  console.log("authenticate side verification token", token);
  if (!token) {
    return res.status(401).json("No Token Found");
  }

  try {
    const decoded = await jwt.verify(
      token,
      "imshubhampatilfrombrainworkspuneindia"
    );

    console.log(decoded);
    req.id = decoded._id;

    const rootUser = await userSchema.findOne({ _id: req.id });
    if (!rootUser) {
      throw new Error("User Not Found");
    }
    console.log(rootUser);

    if (rootUser.isAdmin === true) {
      next();
    } else {
      throw new Error("You Are Not Admin");
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "You Are Not Admin" });
  }
};

module.exports = isAdmin;
