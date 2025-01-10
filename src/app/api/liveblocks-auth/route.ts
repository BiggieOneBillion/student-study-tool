import liveblocks from "@/lib/liveblocks";
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
// import Doc from "@/models/docs";
import User from "@/models/user";

export async function POST(req: NextRequest) {
  const { room, userId, email, username } = await req.json();

  const session = liveblocks.prepareSession(userId, {
    userInfo: {
      name: username,
      email: email,
      avatar: "https://example.com/avatar.png",
    },
  });

  await dbConnect();

  const user = await User.findById(userId);

  if (!user) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 },
    );
  }

  const rooms = [...user.researchDocs.owner, ...user.researchDocs.shared].map(el => el.toHexString());

  // console.log("ROOMS", room);
  
  // console.log('HELLO DEAR---', rooms);

  const roomExists = rooms.find((r) => r === room);

  // console.log("ROOM EXISTS", roomExists);

  if (!roomExists) {
    return NextResponse.json(
      { message: "You are not in this room" },
      { status: 403 },
    );
  }

  // const usersInRoom = await adminDb
  //   .collectionGroup("rooms")
  //   .where("userId", "==", sessionClaims?.email!)
  //   .get();

  // const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);

  if (roomExists) {
    session.allow(room, session.FULL_ACCESS);
    const { body, status } = await session.authorize();

    // console.log("You are authorised");

    return new Response(body, { status });
  } else {
    return NextResponse.json(
      { message: "You are not in this room" },
      { status: 403 },
    );
  }
}
