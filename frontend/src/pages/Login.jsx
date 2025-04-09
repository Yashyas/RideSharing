import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Login Page
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log("Logging in with", { email, password });

      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });
      login(res.data.user, res.data.token);
      if (res.data.user.role === 'rider') {
        navigate('/rider');
      } else {
        navigate('/driver');
      }
    } catch (err) {
      alert("Login failed: " + err.response?.data?.error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}