import { Link } from "react-router-dom";
import taxiImage from "../assets/taxi.jpg"; // Adjusted path from Home.jsx location

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <div
        className="bg-cover bg-center min-h-[80vh] flex items-center justify-center text-center px-6"
        style={{
          backgroundImage: `url(${taxiImage})`,
        }}
      >
        <div className="bg-black bg-opacity-60 p-10 rounded-lg text-white max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Ride, Just a Tap Away</h1>
          <p className="text-lg mb-6">Book, track, and reach your destination with comfort and ease.</p>
          <Link
            to="/register"
            className="bg-white text-black px-6 py-3 rounded hover:bg-gray-200 transition"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-12">Why RideShare?</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          <div>
            <img src="https://img.icons8.com/ios-filled/100/000000/driver.png" alt="driver" className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Verified Drivers</h3>
            <p className="text-gray-700">All our drivers are background-checked and verified to ensure safety.</p>
          </div>
          <div>
            <img src="https://img.icons8.com/ios-filled/100/000000/clock--v1.png" alt="clock" className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Real-Time Matching</h3>
            <p className="text-gray-700">Get instantly matched with nearby available drivers using our real-time system.</p>
          </div>
          <div>
            <img src="https://img.icons8.com/ios-filled/100/000000/map.png" alt="map" className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Live Tracking</h3>
            <p className="text-gray-700">Track your driver and get live updates till you reach your destination.</p>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          <div>
            <div className="text-4xl font-bold text-gray-600 mb-2">1</div>
            <h4 className="text-xl font-semibold mb-2">Create an Account</h4>
            <p>Sign up as a rider or driver with just a few clicks and start your journey.</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-gray-600 mb-2">2</div>
            <h4 className="text-xl font-semibold mb-2">Book or Accept a Ride</h4>
            <p>Riders book rides, drivers see requests and accept them in real-time.</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-gray-600 mb-2">3</div>
            <h4 className="text-xl font-semibold mb-2">Ride and Rate</h4>
            <p>Complete your ride and leave feedback to keep improving our service.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6 mt-12">
        <p>© {new Date().getFullYear()} RideShare. All rights reserved.</p>
      </footer>
    </div>
  );
}
