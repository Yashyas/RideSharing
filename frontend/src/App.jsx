import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RiderDashboard from "./pages/RiderDashboard";
import DriverDashboard from "./pages/DriverDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rider" element={<RiderDashboard />} />
        <Route path="/driver" element={<DriverDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
