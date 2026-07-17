"use client";

import { useEffect, useMemo, useState } from "react";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  async function loadBookings() {
    const res = await fetch("/api/booking");
    const data = await res.json();
    setBookings(data);
  }

  useEffect(() => {
    loadBookings();
  }, []);

  async function updateStatus(
    id: number,
    status: string
  ) {
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
  }

  async function deleteBooking(id: number) {
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
  }

  const filtered = useMemo(() => {
    const q = search.toLowerCase();

    return bookings.filter((booking: any) =>
      (booking.full_name ?? "")
        .toLowerCase()
        .includes(q) ||
      (booking.room ?? "")
        .toLowerCase()
        .includes(q) ||
      (booking.phone ?? "")
        .toLowerCase()
        .includes(q)
    );
  }, [bookings, search]);

  return (
    <main className="min-h-screen bg-gray-100">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Bookings
          </h1>

          <p className="text-gray-500">
            Manage all hotel reservations.
          </p>

        </div>

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search guest, room or phone..."
          className="w-80 rounded-xl border bg-white px-4 py-3 shadow-sm outline-none"
        />

      </div>

      <div className="bg-white rounded-2xl shadow overflow-x-auto">

        <table className="min-w-[1050px] w-full text-sm">

          <thead className="bg-blue-600 text-white">

            <tr>

              <th className="p-4 text-left">
                Guest
              </th>

              <th className="p-4 text-left">
                Phone
              </th>

              <th className="p-4 text-left">
                Room
              </th>

              <th className="p-4 text-left">
                Check In
              </th>

              <th className="p-4 text-left">
                Check Out
              </th>

              <th className="p-4 text-center">
                Guests
              </th>

              <th className="p-4 text-center">
                Status
              </th>

              <th className="p-4 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

        
          {filtered.map((booking: any) => (

  <tr
    key={booking.id}
    className="border-b hover:bg-gray-50 transition"
  >

    <td
      className="p-4 font-medium"
      title={booking.full_name}
    >
      {booking.full_name}
    </td>

    <td className="p-4">
      {booking.phone}
    </td>

    <td
      className="p-4"
      title={booking.room}
    >
      {booking.room}
    </td>

    <td className="p-4">
      {new Date(
        booking.check_in
      ).toLocaleDateString()}
    </td>

    <td className="p-4">
      {new Date(
        booking.check_out
      ).toLocaleDateString()}
    </td>

    <td className="p-4 text-center">
      {booking.guests}
    </td>

    <td className="p-4 text-center">

      <select
        value={booking.status}
        onChange={(e) =>
          updateStatus(
            booking.id,
            e.target.value
          )
        }
        className="rounded-lg border px-3 py-2"
      >

        <option>Pending</option>

        <option>Confirmed</option>

        <option>Checked In</option>

        <option>Checked Out</option>

        <option>Cancelled</option>

      </select>

    </td>

    <td className="p-4 text-center">

      <button
        onClick={() =>
          deleteBooking(
            booking.id
          )
        }
        className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
      >
        Delete
      </button>

    </td>

  </tr>

))}
{filtered.length === 0 && (

  <tr>

    <td
      colSpan={8}
      className="p-10 text-center text-gray-500"
    >
      No bookings found.
    </td>

  </tr>

)}

          </tbody>

        </table>

      </div>

    </main>

  );
}
