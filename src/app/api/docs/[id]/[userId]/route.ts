import { dbConnect } from "@/lib/db";
import Doc from "@/models/docs";
import User from "@/models/user";
import { ObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; userId: string } },
): Promise<NextResponse> {
  const { id, userId } = params;

  try {
    await dbConnect(); // connect to database

    const doc = await Doc.findById(id);

    if (!doc) {
      return NextResponse.json({
        status: 404,
        message: `Document ${id} not found`,
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    // console.log("OWNER", user.researchDocs.owner);

    const check = user.researchDocs.owner.some(
      (el: ObjectId) => el.toString() === id,
    );

    // console.log("CHECK", check);

    if (!check) {
      return NextResponse.json(
        { message: "You are not the owner of this document" },
        { status: 403 },
      );
    }

    user.researchDocs.owner = user.researchDocs.owner.filter(
      (el: ObjectId) => el.toString() !== id,
    );

    await Doc.findByIdAndDelete(id);

    await user.save();

    return NextResponse.json({ message: "Document deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
