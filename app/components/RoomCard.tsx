import Link from "next/link";

type Room = {
  id: number;
  name: string;
  description: string;
  price: number;
  guests: number;
  image: string;
};

export default function RoomCard({ room }: { room: Room }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <img
        src={room.image}
        alt={room.name}
        className="w-full h-60 object-cover"
      />

      <div className="p-6">
        <h3 className="text-2xl font-bold">{room.name}</h3>

        <p className="text-gray-600 mt-2">
          {room.description}
        </p>

        <div className="flex justify-between items-center mt-6">
          <span className="text-blue-600 text-xl font-bold">
            ₦{room.price.toLocaleString()}
          </span>

          <Link
            href={`/booking?room=${room.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}