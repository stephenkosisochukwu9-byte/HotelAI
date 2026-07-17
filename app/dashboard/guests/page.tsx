"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Guest = {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  room: string;
  check_in: string;
  check_out: string;
  guests: number;
  status: string;
};

export default function GuestsPage() {
  const [guestList, setGuestList] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGuests();
  }, []);

  async function loadGuests() {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setGuestList(data as Guest[]);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="text-xl font-semibold">
        Loading guests...
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Guests</h1>

        <div className="text-gray-500 text-sm">
          Total Guests:
          <span className="font-bold ml-2">
            {guestList.length}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow border overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-100 border-b">

            <tr>
              <th className="w-[14%] px-3 py-3 text-left">Guest</th>
              <th className="w-[14%] px-3 py-3 text-left">Room</th>
              <th className="w-[13%] px-3 py-3 text-left">Phone</th>
              <th className="w-[20%] px-3 py-3 text-left">Email</th>
              <th className="w-[10%] px-3 py-3 text-left">Check-In</th>
              <th className="w-[10%] px-3 py-3 text-left">Check-Out</th>
              <th className="w-[7%] px-3 py-3 text-center">Guests</th>
              <th className="w-[12%] px-3 py-3 text-center">Status</th>
            </tr>

          </thead>

          <tbody>

            {guestList.map((guest) => (

              <tr
                key={guest.id}
                className="border-b hover:bg-gray-50 transition"
              >

                <td
                  className="px-3 py-4 truncate"
                  title={guest.full_name}
                >
                  {guest.full_name}
                </td>

                <td
                  className="px-3 py-4 truncate"
                  title={guest.room}
                >
                  {guest.room}
                </td>

                <td className="px-3 py-4">
                  {guest.phone}
                </td>

                <td
                  className="px-3 py-4 truncate"
                  title={guest.email}
                >
                  {guest.email}
                </td>

                <td className="px-3 py-4">
                  {guest.check_in}
                </td>

                <td className="px-3 py-4">
                  {guest.check_out}
                </td>

                <td className="px-3 py-4 text-center">
                  {guest.guests}
                </td>

                <td className="px-3 py-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      guest.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : guest.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {guest.status}
                  </span>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
}