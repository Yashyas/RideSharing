export default function About() {
    return (
      <div className="w-full min-h-screen bg-white text-gray-900">
        {/* Hero Banner */}
        <div className="bg-gray-900 text-white py-20 px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About RideShare</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Empowering seamless urban mobility with technology. We connect riders and drivers with speed, reliability, and trust.
          </p>
        </div>
  
        {/* Mission Section */}
        <section className="py-16 px-6 bg-white text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="max-w-4xl mx-auto text-lg text-gray-700 leading-relaxed">
            RideShare is built with the idea of bridging the transportation gap in urban and semi-urban regions by offering a smart, scalable, and reliable ride-hailing solution. Whether you're a daily commuter or a part-time driver, RideShare is your trusted mobility partner.
          </p>
        </section>
  
        {/* Project Details Section */}
        <section className="py-16 px-6 bg-gray-100">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4">How the System Works</h3>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
                <li>Riders can easily book rides using a simple, intuitive interface.</li>
                <li>Drivers receive ride requests in real-time and can accept multiple bookings.</li>
                <li>Status updates like <strong>accepted</strong> and <strong>completed</strong> reflect instantly using <strong>Socket.io</strong>.</li>
                <li>Each user has a personalized dashboard showing history and current ride status.</li>
              </ul>
            </div>
            <div>
              <img
                src="https://img.freepik.com/free-vector/urban-carpooling-concept-illustration_23-2148751519.jpg"
                alt="RideShare system"
                className="rounded-lg shadow-md w-full"
              />
            </div>
          </div>
        </section>
  
        {/* Tech Stack Section */}
        <section className="py-16 px-6 bg-white">
          <h2 className="text-3xl font-bold text-center mb-10">Tech Behind RideShare</h2>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
            <div>
              <h4 className="text-xl font-semibold mb-2">Frontend</h4>
              <p className="text-gray-700 mb-4">
                Built with <strong>React</strong> and <strong>Vite</strong>, styled using <strong>Tailwind CSS</strong> for responsive design and clean UI.
              </p>
              <h4 className="text-xl font-semibold mb-2">Backend</h4>
              <p className="text-gray-700 mb-4">
                Powered by <strong>Express.js</strong> with <strong>MongoDB Atlas</strong> as the database, and real-time updates handled by <strong>Socket.io</strong>.
              </p>
            </div>
            <div>
              <img
                src="https://img.freepik.com/free-vector/programming-concept-illustration_114360-1351.jpg"
                alt="Tech stack"
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </section>
  
        {/* Vision */}
        <section className="py-16 px-6 bg-gray-100 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed">
            We envision a world where transportation is never a barrier to opportunity. With RideShare, we aim to build smart cities one ride at a time — reducing traffic, saving fuel, and bringing people closer through smarter commutes.
          </p>
        </section>
  
        {/* Footer */}
        <footer className="bg-gray-900 text-white text-center py-6 mt-12">
          <p>© {new Date().getFullYear()} RideShare. Empowering Mobility.</p>
        </footer>
      </div>
    );
  }
  