"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);

  const [settings, setSettings] = useState({
    hotel_name: "",
    address: "",
    phone: "",
    email: "",
    check_in: "",
    check_out: "",
    parking: "",
    restaurant: "",
    pool: "",
    gym: "",
    pet_policy: "",
    cancellation_policy: "",
    breakfast: "",
  });

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    setLoading(true);

    const { data, error } = await supabase
      .from("hotel_settings")
      .select("*")
      .limit(1)
      .single();

    if (!error && data) {
      setSettings({
        hotel_name: data.hotel_name || "",
        address: data.address || "",
        phone: data.phone || "",
        email: data.email || "",
        check_in: data.check_in || "",
        check_out: data.check_out || "",
        parking: data.parking || "",
        restaurant: data.restaurant || "",
        pool: data.pool || "",
        gym: data.gym || "",
        pet_policy: data.pet_policy || "",
        cancellation_policy: data.cancellation_policy || "",
        breakfast: data.breakfast || "",
      });
    }

    setLoading(false);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  }

  async function saveSettings() {
    const { data } = await supabase
      .from("hotel_settings")
      .select("id")
      .limit(1);

    let error;

    if (data && data.length > 0) {
      ({ error } = await supabase
        .from("hotel_settings")
        .update(settings)
        .eq("id", data[0].id));
    } else {
      ({ error } = await supabase
        .from("hotel_settings")
        .insert([settings]));
    }

    if (error) {
      alert(error.message);
      return;
    }

    alert("✅ Hotel settings saved successfully!");
  }

  if (loading) {
    return (
      <main className="max-w-4xl mx-auto p-10">
        <h1 className="text-4xl font-bold">
          Loading hotel settings...
        </h1>
      </main>
    );
  }
  return (
    <main className="max-w-4xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-8">
        Hotel Settings
      </h1>

      <div className="bg-white shadow-xl rounded-xl p-8 space-y-5">

       <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Hotel Name
  </label>

  <input
    className="w-full border border-gray-300 p-3 rounded-lg"
    name="hotel_name"
    value={settings.hotel_name}
    onChange={handleChange}
  />
</div>

       <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Hotel Address
  </label>

  <input
    className="w-full border border-gray-300 p-3 rounded-lg"
    name="address"
    value={settings.address}
    onChange={handleChange}
  />
</div>


      <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Phone Number
  </label>

  <input
    className="w-full border border-gray-300 p-3 rounded-lg"
    name="phone"
    value={settings.phone}
    onChange={handleChange}
  />
</div>

       <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Email Address
  </label>

  <input
    className="w-full border border-gray-300 p-3 rounded-lg"
    name="email"
    value={settings.email}
    onChange={handleChange}
  />
</div>

        <div className="grid md:grid-cols-2 gap-4">

          <div className="grid md:grid-cols-2 gap-4">

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Check-in Time
    </label>

    <input
      className="w-full border border-gray-300 p-3 rounded-lg"
      name="check_in"
      value={settings.check_in}
      onChange={handleChange}
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Check-out Time
    </label>

    <input
      className="w-full border border-gray-300 p-3 rounded-lg"
      name="check_out"
      value={settings.check_out}
      onChange={handleChange}
    />
  </div>

</div>

        </div>

        <div className="grid md:grid-cols-2 gap-4">

          <div className="grid md:grid-cols-2 gap-4">

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Parking
    </label>

    <input
      className="w-full border border-gray-300 p-3 rounded-lg"
      name="parking"
      value={settings.parking}
      onChange={handleChange}
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Restaurant
    </label>

    <input
      className="w-full border border-gray-300 p-3 rounded-lg"
      name="restaurant"
      value={settings.restaurant}
      onChange={handleChange}
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Swimming Pool
    </label>

    <input
      className="w-full border border-gray-300 p-3 rounded-lg"
      name="pool"
      value={settings.pool}
      onChange={handleChange}
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Gym
    </label>

    <input
      className="w-full border border-gray-300 p-3 rounded-lg"
      name="gym"
      value={settings.gym}
      onChange={handleChange}
    />
  </div>

</div>
        </div>

        <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Pet Policy
  </label>

  <input
    className="w-full border border-gray-300 p-3 rounded-lg"
    name="pet_policy"
    value={settings.pet_policy}
    onChange={handleChange}
  />
</div>

       <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Cancellation Policy
  </label>

  <input
    className="w-full border border-gray-300 p-3 rounded-lg"
    name="cancellation_policy"
    value={settings.cancellation_policy}
    onChange={handleChange}
  />
</div>
        <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Breakfast Time
  </label>

  <input
    className="w-full border border-gray-300 p-3 rounded-lg"
    name="breakfast"
    value={settings.breakfast}
    onChange={handleChange}
  />
</div>

        <button
          onClick={saveSettings}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Save Hotel Settings
        </button>

      </div>
    </main>
  );
}