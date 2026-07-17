"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SettingsPage() {
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
    gym:"",
    pet_policy:"",
    cancellation_policy:"",
    breakfast:"",
  });
function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  setSettings({
    ...settings,
    [e.target.name]: e.target.value,
  });
}
async function saveSettings() {
  // Check if settings already exist
  const { data } = await supabase
    .from("hotel_settings")
    .select("id")
    .limit(1);

  let error;

  if (data && data.length > 0) {
    // Update existing settings
    ({ error } = await supabase
      .from("hotel_settings")
      .update(settings)
      .eq("id", data[0].id));
  } else {
    // First time, create settings
    ({ error } = await supabase
      .from("hotel_settings")
      .insert([settings]));
  }

  if (error) {
    alert(error.message);
    return;
  }

  alert("Settings saved successfully!");
}
  return (
    <main className="max-w-4xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-8">
        Hotel Settings
      </h1>

      <div className="space-y-4">

        <input
          className="w-full border p-3 rounded-lg"
          name="hotel_name"
          placeholder="Hotel Name"
          value={settings.hotel_name}
          onChange={handleChange}
        />

        <input
          className="w-full border p-3 rounded-lg"
          name="address"
          placeholder="Hotel Address"
          value={settings.address}
          onChange={handleChange}
        />

        <input
          className="w-full border p-3 rounded-lg"
          name="phone"
          placeholder="Phone Number"
          value={settings.phone}
          onChange={handleChange}
        />

        <input
          className="w-full border p-3 rounded-lg"
          name="email"
          placeholder="Email"
          value={settings.email}
          onChange={handleChange}
        />

        <input
          className="w-full border p-3 rounded-lg"
          name="check_in"
          placeholder="Check-in Time"
          value={settings.check_in}
          onChange={handleChange}
        />

        <input
          className="w-full border p-3 rounded-lg"
          name="check_out"
          placeholder="Check-out Time"
          value={settings.check_out}
          onChange={handleChange}
        />

        <input
  className="w-full border p-3 rounded-lg"
  name="parking"
  placeholder="Parking (Yes/No)"
  value={settings.parking}
  onChange={handleChange}
/>

<input
  className="w-full border p-3 rounded-lg"
  name="restaurant"
  placeholder="Restaurant (Yes/No)"
  value={settings.restaurant}
  onChange={handleChange}
/>

<input
  className="w-full border p-3 rounded-lg"
  name="pool"
  placeholder="Swimming Pool (Yes/No)"
  value={settings.pool}
  onChange={handleChange}
/>

<input
  className="w-full border p-3 rounded-lg"
  name="gym"
  placeholder="Gym (Yes/No)"
  value={settings.gym}
  onChange={handleChange}
/>

<input
  className="w-full border p-3 rounded-lg"
  name="pet_policy"
  placeholder="Pet Policy"
  value={settings.pet_policy}
  onChange={handleChange}
/>

<input
  className="w-full border p-3 rounded-lg"
  name="cancellation_policy"
  placeholder="Cancellation Policy"
  value={settings.cancellation_policy}
  onChange={handleChange}
/>

        <input
          className="w-full border p-3 rounded-lg"
          name="breakfast"
          placeholder="Breakfast Time"
          value={settings.breakfast}
          onChange={handleChange}
        />

        <button
  onClick={saveSettings}
  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
>
  Save Settings
</button>

      </div>
    </main>
  );
}
