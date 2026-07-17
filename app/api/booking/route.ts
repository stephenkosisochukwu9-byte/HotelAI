import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET all bookings
export async function GET() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}

// CREATE booking
export async function POST(req: Request) {
  const body = await req.json();

  const { data, error } = await supabase
    .from("bookings")
    .insert([
      {
        full_name: body.full_name,
        email: body.email,
        phone: body.phone,
        room: body.room,
        check_in: body.check_in,
        check_out: body.check_out,
        guests: body.guests,
        status: "Confirmed",
      },
    ])
    .select();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}

// UPDATE booking status
export async function PUT(req: Request) {
  const body = await req.json();

  const { data, error } = await supabase
    .from("bookings")
    .update({
      status: body.status,
    })
    .eq("id", body.id)
    .select();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}

// DELETE booking
export async function DELETE(req: Request) {
  const body = await req.json();

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", body.id);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
  });
}