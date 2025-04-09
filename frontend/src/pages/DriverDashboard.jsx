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
    const hasActiveRide = myRides.some(r => r.status === "accepted" || r.status === "pending");
    if (hasActiveRide) {
      alert("You already have an ongoing ride. Complete it before accepting a new one.");
      return;
    }

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

  const ongoingRides = myRides.filter(ride => ride.status === "accepted" || ride.status === "pending");
  const completedRides = myRides.filter(ride => ride.status === "completed");

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Welcome, {user.name}</h2>

        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">📢 Available Rides</h3>
          {availableRides.length === 0 ? (
            <p className="text-gray-500">No rides available at the moment.</p>
          ) : (
            <ul className="space-y-4">
              {availableRides.map(ride => (
                <li key={ride._id} className="flex justify-between items-center border border-gray-200 rounded-md p-4">
                  <div>
                    <p className="font-medium text-gray-700">
                      {ride.pickup} → {ride.drop}
                    </p>
                    <p className="text-sm text-gray-500">Rider: {ride.riderId?.name || 'N/A'}</p>
                  </div>
                  <button
                    onClick={() => acceptRide(ride._id)}
                    className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                  >
                    Accept
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">🚗 Ongoing Rides</h3>
          {ongoingRides.length === 0 ? (
            <p className="text-gray-500">No ongoing rides.</p>
          ) : (
            <ul className="space-y-4">
              {ongoingRides.map(ride => (
                <li key={ride._id} className="flex justify-between items-center border border-gray-200 rounded-md p-4">
                  <div>
                    <p className="font-medium text-gray-700">
                      {ride.pickup} → {ride.drop}
                    </p>
                    <p className="text-sm text-gray-500">Status: {ride.status}</p>
                  </div>
                  {ride.status === "accepted" && (
                    <button
                      onClick={() => completeRide(ride._id)}
                      className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                    >
                      Mark as Completed
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">✅ Ride History</h3>
          {completedRides.length === 0 ? (
            <p className="text-gray-500">No completed rides yet.</p>
          ) : (
            <ul className="space-y-4">
              {completedRides.map(ride => (
                <li key={ride._id} className="border border-gray-200 rounded-md p-4">
                  <p className="font-medium text-gray-700">
                    {ride.pickup} → {ride.drop}
                  </p>
                  <p className="text-sm text-gray-500">Status: Completed</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
