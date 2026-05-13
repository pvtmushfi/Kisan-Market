import { useState, useEffect } from "react";

// Mandi prices — real approximate modal prices (₹/kg)
// Source: Agmarknet data for Madhya Pradesh mandis
const CROPS = [
  { name: "Tomato",    emoji: "🍅", mandiPrice: 18,  unit: "kg", minQty: 10,  maxQty: 1000 },
  { name: "Potato",    emoji: "🥔", mandiPrice: 12,  unit: "kg", minQty: 10,  maxQty: 2000 },
  { name: "Onion",     emoji: "🧅", mandiPrice: 15,  unit: "kg", minQty: 10,  maxQty: 2000 },
  { name: "Cauliflower",emoji: "🥦",mandiPrice: 10,  unit: "kg", minQty: 5,   maxQty: 500  },
  { name: "Spinach",   emoji: "🌿", mandiPrice: 8,   unit: "kg", minQty: 5,   maxQty: 300  },
  { name: "Wheat",     emoji: "🌾", mandiPrice: 22,  unit: "kg", minQty: 50,  maxQty: 5000 },
  { name: "Garlic",    emoji: "🧄", mandiPrice: 60,  unit: "kg", minQty: 5,   maxQty: 500  },
  { name: "Ginger",    emoji: "🫚", mandiPrice: 55,  unit: "kg", minQty: 5,   maxQty: 300  },
];

// KisanMarket platform commission — 0%
// Farmers get ~80-90% of consumer price directly
// Conservative estimate: farmer gets 1.85x mandi price
const KISAN_MULTIPLIER = 1.85;
const PLATFORM_FEE_PERCENT = 0; // zero commission — our USP

function formatINR(amount) {
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} Lakh`;
  if (amount >= 1000)   return `₹${(amount / 1000).toFixed(1)}K`;
  return `₹${Math.round(amount)}`;
}

export default function IncomeSimulator() {
  const [selectedCrop, setSelectedCrop] = useState(CROPS[0]);
  const [quantity, setQuantity]         = useState(100);
  const [animated, setAnimated]         = useState(false);

  // Trigger number animation on change
  useEffect(() => {
    setAnimated(false);
    const t = setTimeout(() => setAnimated(true), 50);
    return () => clearTimeout(t);
  }, [selectedCrop, quantity]);

  const mandiIncome   = selectedCrop.mandiPrice * quantity;
  const kisanIncome   = Math.round(selectedCrop.mandiPrice * KISAN_MULTIPLIER * quantity);
  const extraIncome   = kisanIncome - mandiIncome;
  const extraPercent  = Math.round(((kisanIncome - mandiIncome) / mandiIncome) * 100);

  // Bar widths for visual comparison
  const maxIncome    = kisanIncome;
  const mandiWidth   = Math.round((mandiIncome / maxIncome) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">

      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-10 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">💰</span>
            <h1 className="text-3xl font-bold">Farmer Income Simulator</h1>
          </div>
          <p className="text-green-100 text-lg">
            Dekho — mandi mein bechne se kitna milta, KisanMarket pe kitna milega
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-8">

        {/* Crop Selector */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            🌱 Apni fasal chuniye
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CROPS.map((crop) => (
              <button
                key={crop.name}
                onClick={() => setSelectedCrop(crop)}
                className={`
                  flex flex-col items-center gap-1 py-3 px-2 rounded-xl border-2 
                  transition-all duration-200 cursor-pointer
                  ${selectedCrop.name === crop.name
                    ? "border-green-600 bg-green-50 shadow-md scale-105"
                    : "border-gray-200 hover:border-green-300 hover:bg-green-50"
                  }
                `}
              >
                <span className="text-3xl">{crop.emoji}</span>
                <span className={`text-sm font-medium ${
                  selectedCrop.name === crop.name ? "text-green-700" : "text-gray-600"
                }`}>
                  {crop.name}
                </span>
                <span className="text-xs text-gray-400">
                  Mandi: ₹{crop.mandiPrice}/{crop.unit}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Quantity Slider */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-700">
              📦 Kitna maal hai aapke paas?
            </h2>
            <div className="bg-green-100 text-green-700 px-4 py-1 rounded-full font-bold text-lg">
              {quantity} {selectedCrop.unit}
            </div>
          </div>

          <input
            type="range"
            min={selectedCrop.minQty}
            max={selectedCrop.maxQty}
            step={selectedCrop.minQty}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full h-3 rounded-lg appearance-none cursor-pointer accent-green-600"
          />

          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{selectedCrop.minQty} {selectedCrop.unit}</span>
            <span>{selectedCrop.maxQty} {selectedCrop.unit}</span>
          </div>

          {/* Quick quantity buttons */}
          <div className="flex gap-2 mt-4 flex-wrap">
            {[50, 100, 250, 500, 1000].filter(q =>
              q >= selectedCrop.minQty && q <= selectedCrop.maxQty
            ).map(q => (
              <button
                key={q}
                onClick={() => setQuantity(q)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all
                  ${quantity === q
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-green-100"
                  }`}
              >
                {q} {selectedCrop.unit}
              </button>
            ))}
          </div>
        </div>

        {/* Income Comparison — MAIN SECTION */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-6">
            📊 Income Comparison
          </h2>

          {/* Visual bars */}
          <div className="space-y-5 mb-8">

            {/* Mandi bar */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400 inline-block"></span>
                  <span className="font-medium text-gray-700">Mandi mein becho</span>
                  <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full">
                    Middlemen lete hain 40-60%
                  </span>
                </div>
                <span className={`font-bold text-xl text-red-500 transition-all duration-500 ${
                  animated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}>
                  {formatINR(mandiIncome)}
                </span>
              </div>
              <div className="h-10 bg-gray-100 rounded-xl overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-400 to-red-500 rounded-xl flex items-center px-3 transition-all duration-700"
                  style={{ width: `${mandiWidth}%` }}
                >
                  <span className="text-white text-xs font-medium whitespace-nowrap">
                    ₹{selectedCrop.mandiPrice}/{selectedCrop.unit}
                  </span>
                </div>
              </div>
            </div>

            {/* KisanMarket bar */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
                  <span className="font-medium text-gray-700">KisanMarket pe becho</span>
                  <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full">
                    0% Commission
                  </span>
                </div>
                <span className={`font-bold text-xl text-green-600 transition-all duration-500 ${
                  animated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}>
                  {formatINR(kisanIncome)}
                </span>
              </div>
              <div className="h-10 bg-gray-100 rounded-xl overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center px-3 transition-all duration-700"
                  style={{ width: "100%" }}
                >
                  <span className="text-white text-xs font-medium whitespace-nowrap">
                    ₹{Math.round(selectedCrop.mandiPrice * KISAN_MULTIPLIER)}/{selectedCrop.unit} — Direct to consumer
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* THE BIG NUMBER */}
          <div className={`
            bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white text-center
            transition-all duration-500
            ${animated ? "opacity-100 scale-100" : "opacity-0 scale-95"}
          `}>
            <p className="text-green-100 text-sm mb-1">KisanMarket pe aapko ZYADA milega</p>
            <div className="text-5xl font-bold mb-1">
              +{formatINR(extraIncome)}
            </div>
            <div className="text-green-100 text-lg">
              {extraPercent}% zyada income — sirf {quantity} {selectedCrop.unit} {selectedCrop.name} pe
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl shadow-md p-5 text-center border-t-4 border-red-400">
            <p className="text-sm text-gray-500 mb-1">Mandi income</p>
            <p className="text-2xl font-bold text-red-500">{formatINR(mandiIncome)}</p>
            <p className="text-xs text-gray-400 mt-1">After middlemen cut</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-5 text-center border-t-4 border-green-500">
            <p className="text-sm text-gray-500 mb-1">KisanMarket income</p>
            <p className="text-2xl font-bold text-green-600">{formatINR(kisanIncome)}</p>
            <p className="text-xs text-gray-400 mt-1">Direct to consumer, 0% fee</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-5 text-center border-t-4 border-yellow-400">
            <p className="text-sm text-gray-500 mb-1">Extra income</p>
            <p className="text-2xl font-bold text-yellow-600">+{extraPercent}%</p>
            <p className="text-xs text-gray-400 mt-1">More in your pocket</p>
          </div>
        </div>

        {/* Year projection */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            📅 Saal bhar ka hisaab (4 harvests)
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-50 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-500">Mandi se saal bhar</p>
              <p className="text-2xl font-bold text-red-500">
                {formatINR(mandiIncome * 4)}
              </p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-500">KisanMarket se saal bhar</p>
              <p className="text-2xl font-bold text-green-600">
                {formatINR(kisanIncome * 4)}
              </p>
            </div>
          </div>
          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
            <p className="text-sm text-yellow-700">Saal bhar ka extra faayda</p>
            <p className="text-3xl font-bold text-yellow-600">
              +{formatINR(extraIncome * 4)}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">
            Ready hain apni income badhane ke liye?
          </h3>
          <p className="text-green-100 mb-6">
            14 crore kisan hain India mein. KisanMarket unka haq dilata hai.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="/register"
              className="bg-white text-green-700 font-bold px-6 py-3 rounded-xl hover:bg-green-50 transition"
            >
              🌾 Farmer Register Karo
            </a>
            <a
              href="/products"
              className="border-2 border-white text-white font-bold px-6 py-3 rounded-xl hover:bg-green-600 transition"
            >
              🛒 Products Dekho
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
