import {  NextResponse } from "next/server";

export async function DELETE() {
  const response = NextResponse.json({ message: "Logged out successfully" });

  // Delete the "auth" cookie by setting its maxAge to 0 (expires immediately)
  response.cookies.set("auth", "", {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production", // Make sure it's secure in production
    path: "/", // Accessible from all paths
    expires: new Date(0), 
  });

  return response;
}
