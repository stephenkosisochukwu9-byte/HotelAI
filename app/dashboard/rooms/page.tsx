"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function RoomsPage() {
  const [rooms, setRooms] = useState<any[]>([]);

  async function loadRooms() {
    const res = await fetch("/api/rooms");
    const data = await res.json();
    setRooms(data);
  }

  useEffect(() => {
    loadRooms();
  }, []);

  async function deleteRoom(id: number) {
    if (!confirm("Delete this room?")) return;

    await fetch("/api/rooms/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    loadRooms();
  }

  return (
    <div className="p-10">
      <div className="flex justify-between mb-8">
        <h1 className="text-4xl font-bold">
          Room Management
        </h1>

       <Link href="/dashboard/rooms/add">
  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
    + Add Room
  </button>
</Link>
      </div>

      <table className="w-full bg-white shadow rounded-xl overflow-hidden">

        <thead className="bg-blue-600 text-white">

          <tr>

            <th className="p-4">Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Guests</th>
            <th>Status</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {rooms.map((room) => (

            <tr key={room.id} className="border-b">

              <td className="p-3">

                <img
                  src={room.image}
                  className="w-24 h-16 object-cover rounded"
                />

              </td>

              <td>{room.name}</td>

              <td>
                ₦{room.price.toLocaleString()}
              </td>

              <td>{room.guests}</td>

              <td>
                {room.available ? (
                  <span className="text-green-600 font-bold">
                    Available
                  </span>
                ) : (
                  <span className="text-red-600 font-bold">
                    Unavailable
                  </span>
                )}
              </td>

              <td>

               <div className="flex gap-2">
  <button
    onClick={() => window.location.href = `/dashboard/rooms/edit/${room.id}`}
    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
  >
    Edit
  </button>

  <button
    onClick={() => deleteRoom(room.id)}
  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
  >
    Delete
  </button>
</div>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}
