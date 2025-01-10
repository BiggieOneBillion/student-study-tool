import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import User from "@/models/user";
import Doc from "@/models/docs";

export async function GET( // get all study plan
  request: NextRequest,
  { params }: { params: { userId: string } },
): Promise<NextResponse> {
  const { userId } = params;

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

    const docs = [...user.researchDocs.owner]; // get all the document id of the user as an owner.

    if (docs.length === 0) {
      return NextResponse.json({ data: [] }, { status: 200 });
    }

    // console.log("DOCS", docs);

    const result = [];

    for (let i = 0; i < docs.length; i++) {
      const doc = await Doc.findById(docs[i].toString());
      // console.log("mY DOCUMENT", docs[i].toString(), doc)
      result.push({ id: doc?._id || "", title: doc.title });
    }

    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error) {
    // console.log(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
