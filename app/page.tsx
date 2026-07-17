import { supabase } from "@/lib/supabase";
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
  const { data: rooms, error } = await supabase
    .from("rooms")
    .select("*")
    .order("id");

  if (error) {
    throw new Error(error.message);
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section
        className="relative min-h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800')",
        }}
      >
        <div className="absolute inset-0 bg-black/65"></div>

        <div className="relative z-10 max-w-7xl mx-auto min-h-screen flex items-center px-6 md:px-8 py-24">
          <div className="max-w-3xl">

            <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm md:text-base font-semibold mb-6">
              AI Powered Hotel Receptionist
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
              Let AI Handle
              <br />
              Your Hotel Guests
              <br />
              24/7
            </h1>

            <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-200 leading-7 max-w-2xl">
              Automate bookings, answer guest questions instantly,
              recommend rooms, and increase revenue with your own AI receptionist.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold">
                Start Free Trial
              </button>

              <button className="border border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-xl font-semibold">
                Watch Demo
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-12 text-center text-white">
              <div>
                <h2 className="text-2xl md:text-4xl font-bold">500+</h2>
                <p className="text-sm md:text-base">Hotels</p>
              </div>

              <div>
                <h2 className="text-2xl md:text-4xl font-bold">24/7</h2>
                <p className="text-sm md:text-base">AI Support</p>
              </div>

              <div>
                <h2 className="text-2xl md:text-4xl font-bold">99.9%</h2>
                <p className="text-sm md:text-base">Uptime</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">

          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
              Everything Your Hotel Needs
            </h2>

            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
              HotelAI works like a professional receptionist that never sleeps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-5xl mb-6">🤖</div>
              <h3 className="text-2xl font-bold mb-4">AI Receptionist</h3>
              <p className="text-gray-600">
                Instantly answers guest questions 24 hours a day without human staff.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-5xl mb-6">🛏</div>
              <h3 className="text-2xl font-bold mb-4">Smart Room Booking</h3>
              <p className="text-gray-600">
                Recommends available rooms and books guests automatically.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-5xl mb-6">📈</div>
              <h3 className="text-2xl font-bold mb-4">Increase Revenue</h3>
              <p className="text-gray-600">
                Never miss another booking because your receptionist was offline.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Rooms */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Available Rooms
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>

      <ChatWidget />
    </main>
  );
}