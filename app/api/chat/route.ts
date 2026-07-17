import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { hotelKnowledge } from "@/app/knowledge/hotelKnowledge";
import {
  getConversation,
  addMessage,
  getBooking,
  getGuestProfile,
} from "@/app/lib/memory";
import { bookingQuestions } from "@/app/booking/bookingQuestions";
import { supabase } from "@/lib/supabase";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(request: Request) {
    console.log("APIroute reached")
  try {
    const { message } = await request.json();

    const sessionId = "guest";

    const history = getConversation(sessionId);
    const booking = getBooking(sessionId);
    const guest = getGuestProfile(sessionId);
    const lowerMessage = message.toLowerCase();

const nameMatch = message.match(/my name is (.+)/i);

if (nameMatch) {
  guest.name = nameMatch[1].trim();
}
const budgetMatch = message.match(/₦?([\d,]+)/);

if (budgetMatch) {
  guest.budget = budgetMatch[1].replace(/,/g, "");
}


    addMessage(sessionId, "user", message);

    // Start booking
    if (
      !booking.active &&
      (
        message.toLowerCase().includes("book") ||
        message.toLowerCase().includes("reservation") ||
        message.toLowerCase().includes("reserve")
      )
    ) {
      booking.active = true;
      booking.step = 0;
      booking.data = {};

      const reply = bookingQuestions[0];

      addMessage(sessionId, "assistant", reply);

      return NextResponse.json({ reply });
    }

    // Continue booking
    if (booking.active) {
      switch (booking.step) {
        case 0:
          booking.data.room = message;
          break;

        case 1:
          booking.data.name = message;
          break;

        case 2:
          booking.data.email = message;
          break;

        case 3:
          booking.data.phone = message;
          break;

        case 4:
          booking.data.checkIn = message;
          break;

        case 5:
          booking.data.checkOut = message;
          break;

        case 6:
          booking.data.guests = message;
booking.active = false;

const summary = `
✅ Your booking request has been received.

Room: ${booking.data.room}
Name: ${booking.data.name}
Email: ${booking.data.email}
Phone: ${booking.data.phone}
Check-in: ${booking.data.checkIn}
Check-out: ${booking.data.checkOut}
Guests: ${booking.data.guests}

Our reception team will contact you shortly.
`;

// Save booking to Supabase
const { data, error } = await supabase
  .from("bookings")
  .insert([
    {
      room: booking.data.room,
      full_name: booking.data.name,
      email: booking.data.email,
      phone: booking.data.phone,
      check_in: booking.data.checkIn,
      check_out: booking.data.checkOut,
      guests: booking.data.guests,
      status: "Pending",
    },
  ])
  .select();
  console.log("Inserted:", data);
console.log("Supabase Error:", error);

if (error) {
  return NextResponse.json({
    reply: JSON.stringify(error),
  });
}

addMessage(sessionId, "assistant", summary);

return NextResponse.json({
  reply: summary,
});
      }

      booking.step++;

      const reply = bookingQuestions[booking.step];

      addMessage(sessionId, "assistant", reply);

      return NextResponse.json({
        reply,
      });
    }

    // Conversation history
    const { data: rooms } = await supabase
  .from("rooms")
  .select("*")
  .eq("available", true);

const roomList =
  rooms
    ?.map(
      (room) =>
        `${room.name}
Price: ₦${room.price}
Guests: ${room.guests}
Description: ${room.description}`
    )
    .join("\n\n") || "No rooms available.";
    const { data: hotel } = await supabase
  .from("hotel_settings")
  .select("*")
  .limit(1)
  .single();

const hotelSettings = hotel
  ? `
Hotel Name: ${hotel.hotel_name}
Address: ${hotel.address}
Phone: ${hotel.phone}
Email: ${hotel.email}
Check-in: ${hotel.check_in}
Check-out: ${hotel.check_out}
Breakfast: ${hotel.breakfast}
Parking: ${hotel.parking}
Restaurant: ${hotel.restaurant}
Swimming Pool: ${hotel.pool}
Gym: ${hotel.gym}
Pet Policy: ${hotel.pet_policy}
Cancellation Policy: ${hotel.cancellation_policy}
`
  : "No hotel settings available.";
    const conversationHistory = history
      .map((msg) => `${msg.role}: ${msg.text}`)
      .join("\n");

    const prompt = `
You are HotelAI, a professional hotel receptionist.

Use ONLY the hotel information below.

Hotel Information:
${hotelSettings}

Additional Hotel Knowledge:
${hotelKnowledge}

Available Rooms:
${roomList}

Conversation:
${conversationHistory}

Guest Name:
${guest.name || "Unknown"}

Guest Budget:
${guest.budget || "Unknown"}

Guest:
${message}

Rules:
- Be friendly.
- Keep answers concise.
- If you don't know something, politely ask the guest to contact reception.
- Never describe features or amenities that are not explicitly provided in the hotel information or room data.
- Only recommend rooms that satisfy ALL of the guest's requirements.
- If no room meets all requirements, clearly explain why and do not recommend a room that fails the guest's budget or capacity.
`;

const completion = await groq.chat.completions.create({
  model: "llama-3.3-70b-versatile",
  messages: [
    {
      role: "user",
      content: prompt,
    },
  ],
});

const reply =
  completion.choices[0]?.message?.content ??
  "Sorry, I couldn't generate a response.";

    addMessage(sessionId, "assistant", reply);

    return NextResponse.json({
      reply,
    });

} catch (error) {
  console.error("FULL ERROR:", error);

  return NextResponse.json({
    reply: String(error),
  });
}
}