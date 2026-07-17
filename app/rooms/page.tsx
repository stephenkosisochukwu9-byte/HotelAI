import { supabase } from "@/lib/supabase";

export default async function Page() {
  const { data: rooms, error } = await supabase
    .from("rooms")
    .select("*")
    .order("id");

  if (error) {
    return <h1>Failed to load rooms.</h1>;
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Our Rooms</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms?.map((room) => (
          <div
            key={room.id}
        className="border rounded-xl p-4 flex flex-col shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300"
          >
            {room.image && (
              <img
                src={room.image}
                alt={room.name}
            className="w-full h-64 object-cover rounded-xl mb-4 transition duration-300 hover:scale-105"
              />
            )}

            <h2 className="text-2xl font-semibold">
              {room.name}
            </h2>

            <p className="mt-2 text-gray-700">
              {room.description}
            </p>

            <p className="mt-2">
              <strong>Guests:</strong> {room.guests}
            </p>

            <p className="mt-2 text-blue-600 font-bold">
              ₦{room.price}
            </p>

            <a
              href={`/booking?room=${room.id}`}
             className="mt-auto inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-center transition"
            >
              Book Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}