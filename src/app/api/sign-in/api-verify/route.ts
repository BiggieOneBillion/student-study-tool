import { NextResponse } from "next/server";
import { generateToken } from "../../utils/auth";

export async function POST() {
  const response = NextResponse.json({ message: "Logged in successfully" });
  const token = await generateToken({ isAuthenticated: true });
  // Delete the "auth" cookie by setting its maxAge to 0 (expires immediately)
  response.cookies.set("auth", token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production", // Make sure it's secure in production
    path: "/", // Accessible from all paths
  });

  return response;
}
