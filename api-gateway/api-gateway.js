

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// AUTH
app.use("/auth", async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `http://auth-service:4001${req.url}`,
      data: req.body,
    });
    res.json(response.data);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Auth Service Error");
  }
});

// ACCOUNT
app.use("/account", async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `http://account-service:4002${req.url}`,
      data: req.body,
    });
    res.json(response.data);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Account Service Error");
  }
});

// TRANSACTION
app.use("/transaction", async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `http://transaction-service:4003${req.url}`, // ✅ FIXED
      data: req.body,
    });
    res.json(response.data);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Transaction Service Error");
  }
});

app.listen(4000, () => console.log("API Gateway running"));
