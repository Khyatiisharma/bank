import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:4000/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      console.log("USER ID:", res.data.userId);

      // 👉 account create (IMPORTANT)
      await axios.post("http://localhost:4000/account/create", {
        userId: res.data.userId,
      });

      alert("Login Success ✅");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Login Failed ❌");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password"
        onChange={(e) => setPassword(e.target.value)} />

      <button onClick={login}>Login</button>

      <p>
        No account? <Link to="/register">Signup</Link>
      </p>
    </div>
  );
}

export default Login;