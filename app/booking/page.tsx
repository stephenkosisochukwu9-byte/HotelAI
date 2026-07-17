"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function BookingContent() {
  const searchParams = useSearchParams();
  const room = searchParams.get("room");

  const [roomData, setRoomData] = useState<any>(null);

  useEffect(() => {
    if (!room) return;

    fetch("/api/rooms")
      .then((res) => res.json())
      .then((data) => {
        const selectedRoom = data.find(
          (r: any) => r.id === Number(room)
        );

        setRoomData(selectedRoom);
      });
  }, [room]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "guests"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const response = await fetch("/api/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: form.name,
        email: form.email,
        phone: form.phone,
        room: roomData.name,
        check_in: form.checkIn,
        check_out: form.checkOut,
        guests: form.guests,
      }),
    });

    if (response.ok) {
      alert("Booking Confirmed!");

      setForm({
        name: "",
        email: "",
        phone: "",
        checkIn: "",
        checkOut: "",
        guests: 1,
      });
    } else {
      alert("Booking Failed!");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-10">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          Hotel Booking
        </h1>

        {roomData && (
          <div className="mb-8">
            <img
              src={roomData.image}
              alt={roomData.name}
              className="w-full h-72 object-cover rounded-xl"
            />

            <h2 className="text-3xl font-bold mt-6 text-gray-900">
              {roomData.name}
            </h2>

            <p className="text-gray-700 mt-2">
              {roomData.description}
            </p>

            <p className="text-2xl text-blue-600 font-bold mt-4">
              ₦{roomData.price.toLocaleString()}
            </p>

            <p className="text-gray-700">
              Maximum Guests: {roomData.guests}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            value={form.name}
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="email"
            name="email"
            value={form.email}
            placeholder="Email"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="text"
            name="phone"
            value={form.phone}
            placeholder="Phone Number"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="date"
            name="checkIn"
            value={form.checkIn}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            />

          <input
            type="date"
            name="checkOut"
            value={form.checkOut}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="number"
            name="guests"
            value={form.guests}
            min="1"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </main>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="p-10">Loading booking...</div>}>
      <BookingContent />
    </Suspense>
  );
}