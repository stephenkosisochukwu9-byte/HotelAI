import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const body = await req.json();

  const { error } = await supabase
    .from("rooms")
    .insert([
      {
        name: body.name,
        description: body.description,
        price: body.price,
        guests: body.guests,
        image: body.image,
        available: body.available,
      },
    ]);

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
