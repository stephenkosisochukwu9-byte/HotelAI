"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Booking = {
  id: number;
  full_name: string;
  room: string;
  email: string;
  phone: string;
  check_in: string;
  check_out: string;
  guests: string;
  status: string;
};

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem("hotelAdmin");

if (!loggedIn) {
  router.push("/login");
  return;
}
    fetch("/api/booking")
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);

  async function updateStatus(id: number, status: string) {
  await fetch("/api/booking/status", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      status,
    }),
  });

  window.location.reload();
}
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        background: "#f4f7fb",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: "240px",
          background: "#0f172a",
          color: "white",
          padding: "30px",
        }}
      >
        <h2>🏨 HotelAI</h2>

        <hr style={{ margin: "20px 0", borderColor: "#334155" }} />

        <p>📊 Dashboard</p>
        <p>📅 Bookings</p>
        <p>🛏 Rooms</p>
        <p>👥 Guests</p>
        <p>⚙ Settings</p>
      </aside>

      {/* Main */}
      <main
        style={{
          flex: 1,
          padding: "40px",
        }}
      >
        <h1>Hotel Admin Dashboard</h1>

        <div
          style={{
            display: "flex",
            gap: "20px",
            margin: "30px 0",
          }}
        >
          <Card title="Total Bookings" value={bookings.length} color="#2563eb" />

          <Card
            title="Pending"
            value={bookings.filter(b => b.status === "Pending").length}
            color="#f59e0b"
          />

          <Card
            title="Confirmed"
            value={bookings.filter(b => b.status === "Confirmed").length}
            color="#16a34a"
          />

          <Card
            title="Cancelled"
            value={bookings.filter(b => b.status === "Cancelled").length}
            color="#dc2626"
          />
        </div>

        <table
          style={{
            width: "100%",
            background: "white",
            borderCollapse: "collapse",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <thead
            style={{
              background: "#2563eb",
              color: "white",
            }}
          >
            <tr>
              <th style={{ padding: 12 }}>Guest</th>
              <th>Room</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Guests</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td style={{ padding: 12 }}>{booking.full_name}</td>
                <td>{booking.room}</td>
                <td>{booking.email}</td>
                <td>{booking.phone}</td>
                <td>{booking.check_in}</td>
                <td>{booking.check_out}</td>
                <td>{booking.guests}</td>
                <td>
  <button
    onClick={() => updateStatus(booking.id, "Confirmed")}
    style={{
      background: "green",
      color: "white",
      border: "none",
      padding: "6px 10px",
      marginRight: "6px",
      cursor: "pointer",
      borderRadius: "5px",
    }}
  >
    Confirm
  </button>

  <button
    onClick={() => updateStatus(booking.id, "Cancelled")}
    style={{
      background: "red",
      color: "white",
      border: "none",
      padding: "6px 10px",
      cursor: "pointer",
      borderRadius: "5px",
    }}
  >
    Cancel
  </button>

  <br />
  <br />

  {booking.status}
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

function Card({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  return (
    <div
      style={{
        flex: 1,
        background: color,
        color: "white",
        padding: "25px",
        borderRadius: "12px",
      }}
    >
      <h3>{title}</h3>

      <h1>{value}</h1>
    </div>
  );
}