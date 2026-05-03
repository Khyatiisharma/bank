import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [txns, setTxns] = useState([]);

  const userId = localStorage.getItem("userId");

  const getBalance = async () => {
    const res = await axios.get(`http://api-gateway:4000/account/${userId}`);
    setBalance(res.data?.balance || 0);
    console.log("USER ID:", userId);
  };

  const getHistory = async () => {
    const res = await axios.get(`http://api-gateway:4000/transaction/${userId}`);
    setTxns(res.data);
  };

  const deposit = async () => {
    await axios.post("http://api-gateway:4000/transaction", {
      userId,
      type: "deposit",
      amount: Number(amount),
    });
    getBalance();
    getHistory();
  };

  const withdraw = async () => {
    await axios.post("http://api-gateway:4000/transaction", {
      userId,
      type: "withdraw",
      amount: Number(amount),
    });
    getBalance();
    getHistory();
  };

  useEffect(() => {
    getBalance();
    getHistory();
  }, []);

  return (
    <div>
      <h2>Bank Dashboard 🏦</h2>

      <h3>Balance: ₹{balance}</h3>

      <input
        placeholder="Enter amount"
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={deposit}>Deposit</button>
      <button onClick={withdraw}>Withdraw</button>

      <h3>Transaction History</h3>

      {txns.map((t) => (
        <div key={t._id}>
          <p>
            {t.type} ₹{t.amount}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
