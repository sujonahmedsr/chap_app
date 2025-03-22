"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { io } from "socket.io-client";

const socket = io("https://chap-app-backend-iota.vercel.app", {
  transports: ["websocket"],  // WebSocket use korar try korte hobe
  withCredentials: true
});

export default function Chat() {
  const router = useRouter();
  const params = useSearchParams();
  const username = params.get("username") || "Guest";
  const room = params.get("room") || "General";

  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.emit("joinRoom", { username, room });

    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [room, username]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const message = { text: input, sender: username, room };
    socket.emit("sendMessage", message);
    setInput("");
  };

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4 flex flex-col h-[500px] border border-gray-300">
        {/* Header */}
        <div className="font-semibold bg-blue-600 text-white p-2 rounded-t-lg flex items-center justify-between text-sm">
          <div>
            <h1>Name: {username}</h1>
            <h1>Room: {room}</h1>
          </div>
          <button
            onClick={handleLogout}
            className="ml-4 bg-white text-blue-600 px-2 py-1 rounded text-lg"
          >
            Logout
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === username ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-3 rounded-lg shadow ${msg.sender === username
                  ? "bg-blue-500 text-white max-w-[75%] rounded-br-none"
                  : "bg-gray-300 text-black max-w-[75%] rounded-bl-none"
                  }`}
              >
                <strong className="block text-lg">{msg.sender}</strong>
                <p className="whitespace-pre-wrap break-words">{msg.text}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Box */}
        <div className="flex mt-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 border border-gray-300 p-2 rounded-l-lg resize-y focus:outline-none"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
