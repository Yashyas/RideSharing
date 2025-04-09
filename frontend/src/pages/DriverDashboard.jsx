import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import socket from "../socket";

export default function DriverDashboard() {
  const { user, token } = useContext(AuthContext);
  const [availableRides, setAvailableRides] = useState([]);
  const [myRides, setMyRides] = useState([]);

  const fetchAvailable = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/rides/available", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAvailableRides(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMyRides = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/rides/driver/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMyRides(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const acceptRide = async (rideId) => {
    try {
      await axios.post(`http://localhost:5000/api/rides/accept/${rideId}`, {
        driverId: user._id
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Ride accepted!");
      fetchAvailable();
      fetchMyRides();
    } catch (err) {
      alert("Accept failed.");
    }
  };

  useEffect(() => {
    fetchAvailable();
    fetchMyRides();

    // Listen for real-time ride updates
    socket.on("new_ride", (newRide) => {
      setAvailableRides(prev => [...prev, newRide]);
    });

    return () => {
      socket.off("new_ride");
    };
  }, []);

  return (
    <div>
      <h2>Welcome, {user.name}</h2>

      <h3>Available Rides</h3>
      {availableRides.length === 0 ? <p>No rides right now.</p> : (
        <ul>
          {availableRides.map(ride => (
            <li key={ride._id}>
              {ride.pickup} → {ride.drop} (Rider: {ride.riderId?.name || 'N/A'})
              <button onClick={() => acceptRide(ride._id)}>Accept</button>
            </li>
          ))}
        </ul>
      )}

      <h3>Your Accepted Rides</h3>
      <ul>
        {myRides.map(ride => (
          <li key={ride._id}>
            {ride.pickup} → {ride.drop} | Status: {ride.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
