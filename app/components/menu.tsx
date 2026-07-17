"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-700">
          HotelAI
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-gray-800 font-medium">
          <Link href="/" className="hover:text-blue-600 transition">
            Home
          </Link>

          <Link href="/rooms" className="hover:text-blue-600 transition">
            Rooms
          </Link>

          <Link href="/about" className="hover:text-blue-600 transition">
            About
          </Link>

          <Link href="/contact" className="hover:text-blue-600 transition">
            Contact
          </Link>

          <Link
            href="/booking"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl text-gray-800"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="flex flex-col items-center py-6 space-y-6">

            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="text-lg font-semibold text-gray-800 hover:text-blue-600"
            >
              Home
            </Link>

            <Link
              href="/rooms"
              onClick={() => setMenuOpen(false)}
              className="text-lg font-semibold text-gray-800 hover:text-blue-600"
            >
              Rooms
            </Link>

            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="text-lg font-semibold text-gray-800 hover:text-blue-600"
            >
              About
            </Link>

            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="text-lg font-semibold text-gray-800 hover:text-blue-600"
            >
              Contact
            </Link>

            <Link
              href="/booking"
              onClick={() => setMenuOpen(false)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}