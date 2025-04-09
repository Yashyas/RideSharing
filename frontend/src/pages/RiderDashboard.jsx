import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import socket from "../socket";

export default function RiderDashboard() {
  const { user, token } = useContext(AuthContext);
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [rides, setRides] = useState([]);

  const fetchRides = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/rides/history/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRides(res.data);
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
      fetchRides();

      socket.emit("new_ride", response.data);
    } catch (err) {
      alert("Booking failed.");
    }
  };

  useEffect(() => {
    fetchRides();

    socket.on("ride_accepted", (updatedRide) => {
      if (updatedRide.riderId?._id === user._id) {
        setRides(prev =>
          prev.map(ride =>
            ride._id === updatedRide._id ? updatedRide : ride
          )
        );
        alert(`Your ride from ${updatedRide.pickup} to ${updatedRide.drop} has been accepted!`);
      }
    });

    socket.on("ride_completed", (updatedRide) => {
      if (updatedRide.riderId?._id === user._id) {
        setRides(prev =>
          prev.map(ride =>
            ride._id === updatedRide._id ? updatedRide : ride
          )
        );
        alert(`Your ride from ${updatedRide.pickup} to ${updatedRide.drop} has been completed.`);
      }
    });

    return () => {
      socket.off("ride_accepted");
      socket.off("ride_completed");
    };
  }, [user]);

  // Separate ongoing and completed rides
  const ongoingRides = rides.filter(r => r.status === "pending" || r.status === "accepted");
  const completedRides = rides.filter(r => r.status === "completed");

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <h3>Book a Ride</h3>
      <input placeholder="Pickup Location" value={pickup} onChange={e => setPickup(e.target.value)} />
      <input placeholder="Drop Location" value={drop} onChange={e => setDrop(e.target.value)} />
      <button onClick={bookRide}>Book Ride</button>

      <h3>Ongoing Rides</h3>
      {ongoingRides.length === 0 ? <p>No ongoing rides.</p> : (
        <ul>
          {ongoingRides.map(ride => (
            <li key={ride._id}>
              {ride.pickup} → {ride.drop} | Status: {ride.status}
              {ride.driverId && <span> | Driver: {ride.driverId.name}</span>}
            </li>
          ))}
        </ul>
      )}

      <h3>Ride History</h3>
      {completedRides.length === 0 ? <p>No completed rides.</p> : (
        <ul>
          {completedRides.map(ride => (
            <li key={ride._id}>
              {ride.pickup} → {ride.drop} | Status: {ride.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
