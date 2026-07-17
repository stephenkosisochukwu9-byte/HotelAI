"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [bookings, setBookings] = useState<any[]>([]);

  const loadBookings = async () => {
    const res = await fetch("/api/booking");
    const data = await res.json();
    setBookings(data);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const updateStatus = async (
    id: number,
    status: string
  ) => {
    await fetch("/api/booking", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        status,
      }),
    });

    loadBookings();
  };

  const deleteBooking = async (id: number) => {
    if (!confirm("Delete this booking?")) return;

    await fetch("/api/booking", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    loadBookings();
  };

  return (
    <main className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-8">
        Hotel Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-6 mb-10">

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">
            Total Bookings
          </h2>

          <p className="text-4xl font-bold text-blue-600">
            {bookings.length}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">
            Confirmed
          </h2>

          <p className="text-4xl font-bold text-green-600">
            {
              bookings.filter(
                (b) => b.status === "Confirmed"
              ).length
            }
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">
            Checked In
          </h2>

          <p className="text-4xl font-bold text-purple-600">
            {
              bookings.filter(
                (b) => b.status === "Checked In"
              ).length
            }
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">
            Cancelled
          </h2>

          <p className="text-4xl font-bold text-red-600">
            {
              bookings.filter(
                (b) => b.status === "Cancelled"
              ).length
            }
          </p>
        </div>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-blue-600 text-white">

            <tr>
              <th className="p-4 text-left">Guest</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Room</th>
              <th className="p-4 text-left">Check In</th>
              <th className="p-4 text-left">Check Out</th>
              <th className="p-4 text-left">Guests</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>

          </thead>

          <tbody>

            {bookings.map((booking) => (

              <tr
                key={booking.id}
                className="border-b"
              >
                <td className="p-4">
                  {booking.full_name}
                </td>

                <td className="p-4">
                   {booking.email}
                </td>

                <td className="p-4">
                   {booking.phone}
                </td>

                <td className="p-4">
                  {booking.room}
                </td>

               <td className="p-4">
  {new Date(booking.check_in).toLocaleDateString()}
</td>

<td className="p-4">
  {new Date(booking.check_out).toLocaleDateString()}
</td>

                <td className="p-4">
                  {booking.guests}
                </td>

                <td className="p-4">

                  <select
                    value={booking.status}
                    onChange={(e) =>
                      updateStatus(
                        booking.id,
                        e.target.value
                      )
                    }
                    className="border rounded-lg p-2"
                  >
                    <option>Pending</option>
                    <option>Confirmed</option>
                    <option>Checked In</option>
                    <option>Checked Out</option>
                    <option>Cancelled</option>
                  </select>

                </td>

                <td className="p-4">

                  <button
                    onClick={() =>
                      deleteBooking(booking.id)
                    }
                    className="bg-red-600 text-white px-3 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}