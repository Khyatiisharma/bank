const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect(
  "mongodb+srv://khyatisharma514:root@khyati.j2pisd5.mongodb.net/",
);

const Transaction = mongoose.model("Transaction", {
  userId: String,
  type: String,
  amount: Number,
});

const axios = require("axios");

app.post("/", async (req, res) => {
  const { userId, type, amount } = req.body;

  // 👉 1. Get current balance
  const accRes = await axios.get(`http://account-service:4002/account/${userId}`);

  let balance = accRes.data?.balance || 0;

  // 👉 2. Update balance
  if (type === "deposit") balance += amount;
  else balance -= amount;

  // 👉 3. Update account service
  await axios.post("http://account-service:4002/account/update", {
    userId,
    balance,
  });

  // 👉 4. Save transaction
  const txn = await Transaction.create(req.body);

  res.json(txn);
});
// Add transaction
app.post("/", async (req, res) => {
  const txn = await Transaction.create(req.body);
  res.json(txn);
});

// Get history
app.get("/:userId", async (req, res) => {
  const txns = await Transaction.find({ userId: req.params.userId });
  res.json(txns);
});

app.listen(4003, () => console.log("Transaction Service running"));
