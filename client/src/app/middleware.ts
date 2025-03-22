import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware for room check
export function middleware(request: NextRequest) {
  const url = request.url;
  const room = new URL(url).searchParams.get("room");
  
  // If room does not exist or room is not created, redirect to login page
  if (!room || room === "General") {
    return NextResponse.redirect(new URL("/", url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/chat'], // Apply middleware only to chat pages
};
