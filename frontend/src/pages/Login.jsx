import { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
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
      alert("Login failed: " + err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Welcome Back</h2>
        <p className="text-center text-gray-600 mb-6">Login to continue riding or driving with RideShare</p>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-700 transition"
          >
            Login
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{' '}
          <span
            className="text-gray-800 underline cursor-pointer hover:text-gray-600"
            onClick={() => navigate('/register')}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
