"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-700">
          HotelAI
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <Link href="/">Home</Link>
          <Link href="/rooms">Rooms</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>

          <Link
            href="/booking"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t flex flex-col items-center gap-4 py-6">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          <Link href="/rooms" onClick={() => setMenuOpen(false)}>
            Rooms
          </Link>

          <Link href="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>

          <Link href="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>

          <Link
            href="/booking"
            onClick={() => setMenuOpen(false)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Book Now
          </Link>
        </div>
      )}
    </nav>
  );
}