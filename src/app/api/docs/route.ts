import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import User from "@/models/user";
import Doc from "@/models/docs";

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json({ message: "Bad Request" }, { status: 400 });
  }

  try {
    await dbConnect(); // Connect to your database

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    const newDoc = new Doc({
      title: "New Document",
      content: "Welcome to your new document",
      ownerId: [userId],
    //   role: "Owner",
    });

    const savedDoc = await newDoc.save();

    user.researchDocs.owner.push(savedDoc._id);

    await user.save();

    return NextResponse.json(savedDoc, { status: 200 });
  } catch (error) {
    // console.log(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json({ message: "Bad Request" }, { status: 400 });
  }

  try {
    await dbConnect(); // Connect to your database

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    const docs = await Doc.find({ ownerId: { $in: [userId] } });

    if (docs.length === 0) {
        return NextResponse.json(
          { message: "No documents found" },
          { status: 404 },
        );
      }

    return NextResponse.json(docs, { status: 200 });
  } catch (error) {
    // console.log(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// export async function PUT(req: NextRequest) {
    
// }
