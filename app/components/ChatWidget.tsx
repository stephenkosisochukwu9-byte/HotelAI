"use client";

import { useState } from "react";

type ChatMessage = {
  sender: "user" | "bot";
  text: string;
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "bot",
      text: "👋 Hello! Welcome to HotelAI.\nHow can I help you today?",
    },
  ]);

  async function sendMessage() {
    if (!message.trim()) return;

    const userMessage = message;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setMessage("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.reply,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, something went wrong.",
        },
      ]);
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-blue-600 text-white text-3xl shadow-lg hover:bg-blue-700"
      >
        💬
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-2xl border overflow-hidden">

          <div className="bg-blue-600 text-white p-4 font-bold">
            HotelAI Assistant
          </div>

          <div className="p-4 h-80 overflow-y-auto flex flex-col gap-3">

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[80%] p-3 rounded-xl whitespace-pre-line ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white self-end"
                    : "bg-gray-100 text-black self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}

          </div>

          <div className="border-t p-3 flex gap-2">

            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              className="flex-1 border rounded-lg px-3 py-2 outline-none"
              placeholder="Type your message..."
            />

            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 rounded-lg"
            >
              Send
            </button>

          </div>

        </div>
      )}
    </>
  );
}