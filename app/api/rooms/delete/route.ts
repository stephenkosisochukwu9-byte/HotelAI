import { supabase } from "@/lib/supabase";

export async function DELETE(req: Request) {
  const { id } = await req.json();

  const { error } = await supabase
    .from("rooms")
    .delete()
    .eq("id", id);

  if (error) {
    return Response.json(error, { status: 500 });
  }

  return Response.json({
    success: true,
  });
}
