import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import socket from "../socket";

export default function RiderDashboard() {
  const { user, token } = useContext(AuthContext);
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/rides/history/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHistory(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const bookRide = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/rides/request", {
        riderId: user._id,
        pickup,
        drop
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Ride booked!");
      setPickup("");
      setDrop("");
      fetchHistory();

      // Emit ride event to notify drivers (optional if backend handles it)
      socket.emit("new_ride", response.data);
    } catch (err) {
      alert("Booking failed.");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <h3>Book a Ride</h3>
      <input placeholder="Pickup Location" value={pickup} onChange={e => setPickup(e.target.value)} />
      <input placeholder="Drop Location" value={drop} onChange={e => setDrop(e.target.value)} />
      <button onClick={bookRide}>Book Ride</button>

      <h3>Your Ride History</h3>
      <ul>
        {history.map(ride => (
          <li key={ride._id}>
            {ride.pickup} → {ride.drop} | Status: {ride.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
