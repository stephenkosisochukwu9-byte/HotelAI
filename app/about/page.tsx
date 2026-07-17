export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">About Our Hotel</h1>

      <p className="text-lg text-gray-700 leading-8">
        Welcome to HotelAI, where comfort meets innovation. We provide
        luxurious accommodation, exceptional hospitality, and an
        AI-powered booking experience that makes planning your stay
        simple and convenient.
      </p>
      <div className="mt-12">
  <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>

  <ul className="space-y-3 text-lg text-gray-700">
    <li>✔️ Luxury rooms and suites</li>
    <li>✔️ Fast and secure online booking</li>
    <li>✔️ 24/7 customer support</li>
    <li>✔️ Free high-speed Wi-Fi</li>
    <li>✔️ Restaurant and bar</li>
    <li>✔️ Swimming pool and fitness center</li>
  </ul>
</div>
<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
  <div className="text-center">
    <h3 className="text-4xl font-bold text-blue-600">150+</h3>
    <p className="text-gray-600 mt-2">Luxury Rooms</p>
  </div>

  <div className="text-center">
    <h3 className="text-4xl font-bold text-blue-600">20k+</h3>
    <p className="text-gray-600 mt-2">Happy Guests</p>
  </div>

  <div className="text-center">
    <h3 className="text-4xl font-bold text-blue-600">15</h3>
    <p className="text-gray-600 mt-2">Years of Excellence</p>
  </div>

  <div className="text-center">
    <h3 className="text-4xl font-bold text-blue-600">24/7</h3>
    <p className="text-gray-600 mt-2">Customer Support</p>
  </div>
</div>
<div className="mt-16">
  <h2 className="text-3xl font-bold text-center mb-8">
    Our Amenities
  </h2>

  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
    <div className="border rounded-xl p-6 text-center shadow-md">
      🏊‍♂️
      <h3 className="font-semibold mt-3">Swimming Pool</h3>
    </div>

    <div className="border rounded-xl p-6 text-center shadow-md">
      🍽️
      <h3 className="font-semibold mt-3">Restaurant</h3>
    </div>

    <div className="border rounded-xl p-6 text-center shadow-md">
      💪
      <h3 className="font-semibold mt-3">Fitness Center</h3>
    </div>

    <div className="border rounded-xl p-6 text-center shadow-md">
      🚗
      <h3 className="font-semibold mt-3">Free Parking</h3>
    </div>

    <div className="border rounded-xl p-6 text-center shadow-md">
      📶
      <h3 className="font-semibold mt-3">Free Wi-Fi</h3>
    </div>

    <div className="border rounded-xl p-6 text-center shadow-md">
      ☕
      <h3 className="font-semibold mt-3">24/7 Room Service</h3>
    </div>
  </div>
</div><div className="mt-16">
  <h2 className="text-3xl font-bold text-center mb-8">
    What Our Guests Say
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="border rounded-xl p-6 shadow-md">
      <p className="text-gray-700 italic">
        "An amazing experience! The rooms were spotless, and the staff
        made us feel at home."
      </p>
      <h3 className="font-semibold mt-4">- Sarah Johnson</h3>
    </div>

    <div className="border rounded-xl p-6 shadow-md">
      <p className="text-gray-700 italic">
        "Booking was effortless, and the facilities exceeded our
        expectations."
      </p>
      <h3 className="font-semibold mt-4">- David Williams</h3>
    </div>

    <div className="border rounded-xl p-6 shadow-md">
      <p className="text-gray-700 italic">
        "One of the best hotels I've stayed in. I'll definitely come
        back."
      </p>
      <h3 className="font-semibold mt-4">- Emily Brown</h3>
    </div>
  </div>
</div>
    </div>
  );
}