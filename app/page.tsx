import Navbar from "./components/menu";
import ChatWidget from "./components/ChatWidget";
import RoomCard from "./components/RoomCard";

type Room = {
  id: number;
  name: string;
  description: string;
  price: number;
  guests: number;
  image: string;
  available: boolean;
};
export default async function Home() {
  const res = await fetch("http://localhost:3000/api/rooms", {
  cache: "no-store",
});

const rooms: Room[] = await res.json();
  return (
    <main className="min-h-screen bg-white">

      <Navbar />

     <section
  className="relative  min-h-screen bg-cover bg-center bg-fixed"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800')",
  }}
>
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/65"></div>

  {/* Content */}
  <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-8 pt-26">

    <div className="max-w-1.8xl">

      <span className="inline-block bg-blue-600 text-white px-5 py-2 rounded-full font-semibold mb-6">
        AI Powered Hotel Receptionist
      </span>

      <h1 className="text-6xl md:text-7xl font-extrabold text-white leading-tight">
        Let AI Handle
        <br />
        Your Hotel Guests
        <br />
        24/7
      </h1>

      <p className="mt-8 text-xl text-gray-200 leading-8 max-w-2xl">
        Automate bookings, answer guest questions instantly,
        recommend rooms, and increase revenue with your own AI receptionist.
      </p>

      <div className="flex gap-5 mt-10">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold">
          Start Free Trial
        </button>

        <button className="border border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-xl text-lg font-semibold">
          Watch Demo
        </button>
      </div>

      <div className="flex gap-10 mt-12 text-white">
        <div>
          <h2 className="text-4xl font-bold">500+</h2>
          Hotels
        </div>

        <div>
          <h2 className="text-4xl font-bold">24/7</h2>
          AI Support
        </div>

        <div>
          <h2 className="text-4xl font-bold">99.9%</h2>
          Uptime
        </div>
      </div>

    </div>

  </div>
</section>
    {/* Features */}
<section className="bg-gray-50 py-24">
  <div className="max-w-7xl mx-auto px-8">

    <div className="text-center mb-16">
      <h2 className="text-5xl font-bold text-gray-900">
        Everything Your Hotel Needs
      </h2>

      <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
        HotelAI works like a professional receptionist that never sleeps.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-10">

      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-5xl mb-6">🤖</div>

        <h3 className="text-2xl font-bold mb-4">
          AI Receptionist
        </h3>

        <p className="text-gray-600">
          Instantly answers guest questions 24 hours a day without human staff.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-5xl mb-6">🛏️</div>

        <h3 className="text-2xl font-bold mb-4">
          Smart Room Booking
        </h3>

        <p className="text-gray-600">
          Recommends available rooms and books guests automatically.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-5xl mb-6">📈</div>

        <h3 className="text-2xl font-bold mb-4">
          Increase Revenue
        </h3>

        <p className="text-gray-600">
          Never miss another booking because your receptionist was offline.
        </p>
      </div>

    </div>

  </div>
</section>
<section className="max-w-7xl mx-auto px-8 py-20">
  <h2 className="text-4xl font-bold text-center mb-12">
    Available Rooms
  </h2>

  <div className="grid md:grid-cols-3 gap-8">
    {rooms.map((room) => (
      <RoomCard key={room.id} room={room} />
    ))}
  </div>
</section>
<ChatWidget />

    </main>
  );
}