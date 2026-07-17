"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function BookingContent() {
  const searchParams = useSearchParams();
  const room = searchParams.get("room");

  const [roomData, setRoomData] = useState<any>(null);

  const [bookingSuccess, setBookingSuccess] = useState(false);

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
      setBookingSuccess(true);
    } else {
      alert("Booking failed. Please try again.");
    }
  };

  if (bookingSuccess) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-10">
        <div className="bg-white shadow-xl rounded-2xl max-w-xl w-full p-8 text-center">

          <div className="text-6xl mb-4">✅</div>

          <h1 className="text-4xl font-bold text-green-600">
            Booking Confirmed!
          </h1>

          <p className="text-gray-600 mt-3">
            Thank you for choosing HotelAI.
            Your reservation has been received successfully.
          </p>

          <div className="mt-8 bg-gray-50 rounded-xl p-6 text-left space-y-4">

            <div>
              <span className="font-semibold">Guest:</span>{" "}
              {form.name}
            </div>

            <div>
              <span className="font-semibold">Room:</span>{" "}
              {roomData?.name}
            </div>

            <div>
              <span className="font-semibold">Check-in:</span>{" "}
              {form.checkIn}
            </div>

            <div>
              <span className="font-semibold">Check-out:</span>{" "}
              {form.checkOut}
            </div>

            <div>
              <span className="font-semibold">Guests:</span>{" "}
              {form.guests}
            </div>

          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">

            <Link
              href="/"
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg text-center hover:bg-blue-700"
            >
              Back to Home
            </Link>

            <button
              onClick={() => {
                setBookingSuccess(false);

                setForm({
                  name: "",
                  email: "",
                  phone: "",
                  checkIn: "",
                  checkOut: "",
                  guests: 1,
                });
              }}
              className="flex-1 border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50"
            >
              Book Another Room
            </button>

          </div>

        </div>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
          Hotel Booking
        </h1>

        {roomData && (
          <div className="mb-8">
            <img
              src={roomData.image}
              alt={roomData.name}
              className="w-full h-64 md:h-72 object-cover rounded-xl"
            />

            <h2 className="text-2xl md:text-3xl font-bold mt-6 text-gray-900">
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
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900"
            required
          />

          <input
            type="email"
            name="email"
            value={form.email}
            placeholder="Email Address"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900"
            required
          />

          <input
            type="text"
            name="phone"
            value={form.phone}
            placeholder="Phone Number"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900"
            required
          />

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Check-in Date
            </label>

            <input
              type="date"
              name="checkIn"
              value={form.checkIn}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 bg-white"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Check-out Date
            </label>

            <input
              type="date"
              name="checkOut"
              value={form.checkOut}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 bg-white"
              required
            />
          </div>

          <input
            type="number"
            name="guests"
            value={form.guests}
            min="1"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
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