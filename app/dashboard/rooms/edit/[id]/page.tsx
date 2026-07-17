"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EditRoomPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    guests: "",
    image: "",
    available: true,
  });

  useEffect(() => {
    loadRoom();
  }, []);

  async function loadRoom() {
    const { data, error } = await supabase
      .from("rooms")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    setForm({
      name: data.name,
      description: data.description,
      price: String(data.price),
      guests: String(data.guests),
      image: data.image,
      available: data.available,
    });

    setLoading(false);
  }

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

  async function saveRoom() {
    const { error } = await supabase
      .from("rooms")
      .update({
        name: form.name,
        description: form.description,
        price: Number(form.price),
        guests: Number(form.guests),
        image: form.image,
        available: form.available,
      })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Room updated successfully.");
    router.push("/dashboard/rooms");
  }
if (loading) {
  return (
    <div className="p-10 text-center text-xl">
      Loading room...
    </div>
  );
}
  return (
  <div className="max-w-2xl mx-auto p-10">
    <h1 className="text-3xl font-bold mb-6">Edit Room</h1>

    <input
      type="text"
      name="name"
      placeholder="Room Name"
      value={form.name}
      onChange={handleChange}
      className="w-full border p-3 rounded mb-4"
    />

    <textarea
      name="description"
      placeholder="Description"
      value={form.description}
      onChange={handleChange}
      className="w-full border p-3 rounded mb-4"
    />

    <input
      type="number"
      name="price"
      placeholder="Price"
      value={form.price}
      onChange={handleChange}
      className="w-full border p-3 rounded mb-4"
    />

    <input
      type="number"
      name="guests"
      placeholder="Guests"
      value={form.guests}
      onChange={handleChange}
      className="w-full border p-3 rounded mb-4"
    />

    <input
      type="text"
      name="image"
      placeholder="Image URL"
      value={form.image}
      onChange={handleChange}
      className="w-full border p-3 rounded mb-4"
    />

    <label className="flex items-center gap-2 mb-6">
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
      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded"
    >
      Update Room
    </button>
  </div>
);
}