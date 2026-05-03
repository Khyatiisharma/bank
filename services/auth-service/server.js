const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());


mongoose.connect(  "mongodb+srv://khyatisharma514:root@khyati.j2pisd5.mongodb.net/");

const User = mongoose.model("User", {
  email: String,
  password: String,
});

// Register
app.post("/register", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({
    email: req.body.email,
    password: hashed,
  });
  res.json(user);
});

// Login
app.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).send("User not found");

  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.status(401).send("Invalid password");

  const token = jwt.sign({ id: user._id }, "secret");
  
  res.json({
  token,
  userId: user._id
});
});

app.listen(4001, () => console.log("Auth Service running"));