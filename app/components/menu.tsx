"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-700">
          HotelAI
        </Link>

        {/* Menu */}
        <div className="flex gap-8 text-gray-700 font-medium">
          <Link href="/">Home</Link>
          <Link href="/rooms">Rooms</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>

        {/* Button */}
        <Link
          href="/booking"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Book Now
        </Link>
      </div>
    </nav>
  );
}

