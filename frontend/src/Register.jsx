import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    try {
      await axios.post("http://localhost:4000/auth/register", {
        email,
        password,
      });

      alert("Registered ✅");
      navigate("/");
    } catch (err) {
      alert("Register Failed ❌");
    }
  };

  return (
    <div>
      <h2>Signup</h2>

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={register}>Signup</button>
    </div>
  );
}

export default Register;
