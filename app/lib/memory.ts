type Message = {
  role: "user" | "assistant";
  text: string;
};

type Booking = {
  active: boolean;
  step: number;
  data: {
    room?: string;
    name?: string;
    email?: string;
    phone?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: string;
  };
};

const conversations: Record<string, Message[]> = {};
const guestProfiles: Record<
  string,
  {
    name?: string;
    budget?: number;
    guests?: number;
  }
> = {};

const bookings: Record<string, Booking> = {};

export function getConversation(id: string) {
  if (!conversations[id]) {
    conversations[id] = [];
  }

  return conversations[id];
}

export function addMessage(
  id: string,
  role: "user" | "assistant",
  text: string
) {
  if (!conversations[id]) {
    conversations[id] = [];
  }

  conversations[id].push({
    role,
    text,
  });

  if (conversations[id].length > 20) {
    conversations[id].shift();
  }
}

export function getBooking(id: string) {
  if (!bookings[id]) {
    bookings[id] = {
      active: false,
      step: 0,
      data: {},
    };
  }

  return bookings[id];
}
export function getGuestProfile(id: string) {
  if (!guestProfiles[id]) {
    guestProfiles[id] = {};
  }

  return guestProfiles[id];
}