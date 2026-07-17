"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  function logout() {
    localStorage.removeItem("hotelAdmin");
    router.push("/login");
  }

  const menu = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: "📊",
    },
    {
      name: "Rooms",
      href: "/dashboard/rooms",
      icon: "🛏",
    },
    {
      name: "Bookings",
      href: "/dashboard",
      icon: "📅",
    },
    {
      name: "Guests",
      href: "/dashboard/guests",
      icon: "👥",
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: "⚙️",
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">

      <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white p-6 overflow-y-auto">

        <h1 className="text-3xl font-bold mb-10">
          🏨 HotelAI
        </h1>

        <nav className="space-y-2">

          {menu.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block rounded-lg px-4 py-3 transition ${
                pathname === item.href
                  ? "bg-blue-600"
                  : "hover:bg-slate-700"
              }`}
            >
              {item.icon} {item.name}
            </Link>
          ))}

        </nav>

        <button
          onClick={logout}
          className="mt-12 w-full bg-red-600 hover:bg-red-700 rounded-lg py-3"
        >
          🚪 Logout
        </button>

      </aside>

      <main className="flex-1 ml-64 h-screen overflow-y-auto p-8">
        {children}
      </main>

    </div>
  );
}
