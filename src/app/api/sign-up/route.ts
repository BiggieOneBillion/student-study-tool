import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import User from "@/models/user";
import { hashPassword } from "@/utils/password";

export async function POST(req: NextRequest) {
  const { email, password, username } = await req.json();

  // console.log(username);
  

  if (!email || !password) {
    return NextResponse.json({ message: "Bad Request" }, { status: 400 });
  }

  try {
    await dbConnect(); // Connect to your database

    // encrypt the password using bcrypt
    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "Registeration complete" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
