"use client";

import { Suspense } from "react";
import Chat from "@/components/Chat";

export default function ChatPage() {
  return (
    <Suspense fallback={<div>Loading chat...</div>}>
      <Chat />
    </Suspense>
  );
}
