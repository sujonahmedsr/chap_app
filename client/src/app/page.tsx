"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("General");
  const router = useRouter();

  const handleLogin = () => {
    if (!username) return;
    router.push(`/chat?username=${username}&room=${room}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-xl p-6 space-y-6 border border-gray-300">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Free Chat</h2>
        
        {/* Username Input */}
        <div className="space-y-2">
          <label className="text-lg font-medium text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
            placeholder="Enter your username"
          />
        </div>

        {/* Room Input */}
        <div className="space-y-2">
          <label className="text-lg font-medium text-gray-700">Room Name</label>
          <input
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
            placeholder="Enter room name"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full py-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-500 hover:to-purple-600 transition-all duration-300"
        >
          Login
        </button>
      </div>
    </div>
  );
}
