"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AddRoomPage() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    guests: "",
    image: "",
    available: true,
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target;

    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    });
  }
async function uploadImage(
  e: React.ChangeEvent<HTMLInputElement>
) {
  if (!e.target.files?.length) return;

  const file = e.target.files[0];

  setUploading(true);

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.error);
    setUploading(false);
    return;
  }

  setForm({
    ...form,
    image: data.image,
  });

  setUploading(false);
}
  async function saveRoom() {
    if (!form.image) {
  alert("Please upload a room image first.");
  return;
}
    const res = await fetch("/api/rooms/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        guests: Number(form.guests),
      }),
    });

    if (res.ok) {
      alert("Room added successfully.");
      router.push("/dashboard/rooms");
    } else {
      alert("Failed to save room.");
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-10">

      <h1 className="text-4xl font-bold mb-8">
        Add New Room
      </h1>

      <input
        name="name"
        placeholder="Room Name"
        onChange={handleChange}
        className="w-full border p-3 rounded mb-4"
      />

      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        className="w-full border p-3 rounded mb-4"
      />

      <input
        name="price"
        type="number"
        placeholder="Price"
        onChange={handleChange}
        className="w-full border p-3 rounded mb-4"
      />

      <input
        name="guests"
        type="number"
        placeholder="Maximum Guests"
        onChange={handleChange}
        className="w-full border p-3 rounded mb-4"
      />

      <input
  type="file"
  accept="image/*"
  onChange={uploadImage}
  className="w-full border p-3 rounded mb-4"
/>

{uploading && (
  <p className="text-blue-600 mb-4">
    Uploading image...
  </p>
)}

{form.image && (
  <img
    src={form.image}
    alt="Preview"
    className="w-64 rounded-lg mb-4"
  />
)}
      <label className="flex items-center gap-3 mb-8">

        <input
          type="checkbox"
          name="available"
          checked={form.available}
          onChange={handleChange}
        />

        Available

      </label>

      <button
        onClick={saveRoom}
        className="bg-blue-600 text-white px-8 py-3 rounded-lg"
      >
        Save Room
      </button>

    </div>
  );
}
