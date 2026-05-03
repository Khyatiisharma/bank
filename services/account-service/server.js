const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect(  "mongodb+srv://khyatisharma514:root@khyati.j2pisd5.mongodb.net/");

const Account = mongoose.model("Account", {
  userId: String,
  balance: Number,
});
app.post("/update", async (req, res) => {
  const { userId, balance } = req.body;

  const acc = await Account.findOneAndUpdate(
    { userId },
    { balance },
    { new: true }
  );

  res.json(acc);
});
// Create account
app.post("/create", async (req, res) => {
  const acc = await Account.create({
    userId: req.body.userId,
    balance: 0,
  });
  res.json(acc);
});

// Get balance
app.get("/:userId", async (req, res) => {
  const acc = await Account.findOne({ userId: req.params.userId });
  res.json(acc);
});

app.listen(4002, () => console.log("Account Service running"));