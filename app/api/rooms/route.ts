import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET all rooms
export async function GET() {
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .order("id");

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}
export async function POST(req: Request) {
  const body = await req.json();

  const { data, error } = await supabase
    .from("rooms")
    .insert([
      {
        name: body.name,
        price: body.price,
        guests: body.guests,
        description: body.description,
        image: body.image,
        available: body.available,
      },
    ])
    .select();

  if (error) {
    return Response.json(error, { status: 500 });
  }

  return Response.json(data);
}
export async function PUT(req: Request) {
  const body = await req.json();

  const { data, error } = await supabase
    .from("rooms")
    .update({
      name: body.name,
      price: body.price,
      guests: body.guests,
      description: body.description,
      available: body.available,
    })
    .eq("id", body.id)
    .select();

  if (error) {
    return Response.json(error, { status: 500 });
  }

  return Response.json(data);
}