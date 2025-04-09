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
    const hasActiveRide = rides.some(r => r.status === "pending" || r.status === "accepted");
    if (hasActiveRide) {
      alert("You already have an ongoing ride. Complete it before booking a new one.");
      return;
    }

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

  const ongoingRides = rides.filter(r => r.status === "pending" || r.status === "accepted");
  const completedRides = rides.filter(r => r.status === "completed");

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Welcome, {user.name}</h2>

        <div className="bg-white shadow-md rounded-lg p-6 mb-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Book a Ride</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              placeholder="Pickup Location"
              className="px-4 py-2 border border-gray-300 rounded-md"
              value={pickup}
              onChange={e => setPickup(e.target.value)}
            />
            <input
              placeholder="Drop Location"
              className="px-4 py-2 border border-gray-300 rounded-md"
              value={drop}
              onChange={e => setDrop(e.target.value)}
            />
            <button
              onClick={bookRide}
              className="bg-gray-900 text-white rounded-md px-4 py-2 hover:bg-gray-700"
            >
              Book Ride
            </button>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">🚗 Ongoing Rides</h3>
          {ongoingRides.length === 0 ? (
            <p className="text-gray-500">No ongoing rides.</p>
          ) : (
            <ul className="space-y-3">
              {ongoingRides.map(ride => (
                <li key={ride._id} className="border border-gray-200 p-4 rounded-md">
                  <p className="font-medium text-gray-700">
                    {ride.pickup} → {ride.drop}
                  </p>
                  <p className="text-sm text-gray-500">
                    Status: <span className="capitalize">{ride.status}</span>
                    {ride.driverId && <> | Driver: {ride.driverId.name}</>}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">🕓 Ride History</h3>
          {completedRides.length === 0 ? (
            <p className="text-gray-500">No completed rides.</p>
          ) : (
            <ul className="space-y-3">
              {completedRides.map(ride => (
                <li key={ride._id} className="border border-gray-200 p-4 rounded-md">
                  <p className="font-medium text-gray-700">
                    {ride.pickup} → {ride.drop}
                  </p>
                  <p className="text-sm text-gray-500">Status: {ride.status}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
