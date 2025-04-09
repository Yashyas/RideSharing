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

  const completeRide = async (rideId) => {
    try {
      await axios.post(`http://localhost:5000/api/rides/complete/${rideId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Ride marked as completed.");
      fetchMyRides();
    } catch (err) {
      alert("Failed to mark ride as completed.");
    }
  };

  useEffect(() => {
    fetchAvailable();
    fetchMyRides();

    socket.on("new_ride", (newRide) => {
      setAvailableRides(prev => [...prev, newRide]);
    });

    return () => {
      socket.off("new_ride");
    };
  }, []);

  // Separate ongoing and completed rides
  const ongoingRides = myRides.filter(ride => ride.status === "accepted" || ride.status === "pending");
  const completedRides = myRides.filter(ride => ride.status === "completed");

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

      <h3>Ongoing Rides</h3>
      {ongoingRides.length === 0 ? <p>No ongoing rides.</p> : (
        <ul>
          {ongoingRides.map(ride => (
            <li key={ride._id}>
              {ride.pickup} → {ride.drop} | Status: {ride.status}
              {ride.status === 'accepted' && (
                <button onClick={() => completeRide(ride._id)}>Mark as Completed</button>
              )}
            </li>
          ))}
        </ul>
      )}

      <h3>Ride History</h3>
      {completedRides.length === 0 ? <p>No completed rides yet.</p> : (
        <ul>
          {completedRides.map(ride => (
            <li key={ride._id}>
              {ride.pickup} → {ride.drop} | Status: Completed
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
