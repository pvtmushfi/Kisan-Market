import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">

      {/* HERO SECTION */}
      <div className="bg-green-600 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-10">

          {/* Text */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to KisanMarket 🌾
            </h1>

            <p className="text-lg opacity-90 mb-6">
              Buy fresh farm products directly from farmers and support local agriculture.
            </p>

            {user ? (
              <p className="mb-4 text-yellow-200">
                Hello, {user.name} 👋
              </p>
            ) : (
              <p className="mb-4 text-yellow-200">
                Join as Farmer or Vendor today
              </p>
            )}

            <div className="flex gap-4 flex-wrap">
              <Link
                to="/products"
                className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
              >
                Explore Products
              </Link>

              {!user && (
                <Link
                  to="/register"
                  className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300"
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>

          {/* Image */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8"
              alt="farm"
              className="rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="max-w-6xl mx-auto py-16 px-6">

        <h2 className="text-3xl font-bold text-center mb-10">
          Why Choose KisanMarket?
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <img
              src="https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2"
              className="rounded-lg mb-4 h-40 w-full object-cover"
              alt="fresh"
            />
            <h3 className="text-xl font-semibold mb-2">Fresh Produce</h3>
            <p className="text-gray-600">
              Directly sourced from farmers without middlemen.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <img
              src="https://images.unsplash.com/photo-1589927986089-35812388d1f4"
              className="rounded-lg mb-4 h-40 w-full object-cover"
              alt="farmers"
            />
            <h3 className="text-xl font-semibold mb-2">Support Farmers</h3>
            <p className="text-gray-600">
              Help farmers earn fair prices for their hard work.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <img
              src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff"
              className="rounded-lg mb-4 h-40 w-full object-cover"
              alt="delivery"
            />
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">
              Quick and reliable delivery to your doorstep.
            </p>
          </div>

        </div>
      </div>

      {/* CTA SECTION */}
      {!user && (
        <div className="bg-green-600 text-white text-center py-16 px-6">
          <h2 className="text-3xl font-bold mb-4">
            Join KisanMarket Today 🚜
          </h2>
          <p className="mb-6">
            Become a farmer or vendor and start selling/buying fresh produce.
          </p>

          <Link
            to="/register"
            className="bg-white text-green-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100"
          >
            Register Now
          </Link>
        </div>
      )}

    </div>
  );
}

export default Home;