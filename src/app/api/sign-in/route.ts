import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { dbConnect } from "@/lib/db";
import User from "@/models/user";
// import { generateToken } from "@/app/api/utils/auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // console.log(email, password);

  if (!email || !password) {
    return NextResponse.json({ message: "Bad Request" }, { status: 400 });
  }

  try {
    await dbConnect(); // Connect to your database

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    // const { password, __v, ...userWithoutPassword } = user.toObject();
    delete user.toObject().password;
    delete user.toObject().__v;

    return NextResponse.json(user.toObject(), { status: 200 });
    // const response = NextResponse.json(userWithoutPassword, { status: 200 });
    // const token = await generateToken({ isAuthenticated: true });
    // // Set a session cookie for authentication
    // // Consider replacing "true" with more secure data like a JWT or user info
    // response.cookies.set("auth", token, {
    //   httpOnly: true, // Prevent access to cookie from JavaScript
    //   // secure: process.env.NODE_ENV === "production", // Set `secure` flag in production
    //   path: "/", // Accessible from all paths
    // });

    // return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 },
    );
  }
}
