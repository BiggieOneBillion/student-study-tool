import { dbConnect } from "@/lib/db";
import Doc from "@/models/docs";
import { NextRequest, NextResponse } from "next/server";

export async function PUT( 
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  const id = params.id;

  try {
    await dbConnect(); // connect to database

    const doc = await Doc.findById(id);

    if (!doc) {
      return NextResponse.json({
        status: 404,
        message: `Document ${id} not found`,
      });
    } else {
      const body = await request.json();

      doc.title = body.title;

      await doc.save();

      return NextResponse.json({ message: "Document updated" });
    }
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  const id = params.id;

  try {
    await dbConnect(); // connect to database

    const doc = await Doc.findById(id);

    if (!doc) {
      return NextResponse.json({
        status: 404,
        message: `Document ${id} not found`,
      });
    }

    return NextResponse.json({ data: doc, message: "Successful Retrived Document" });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// export async function DELETE( 
//   request: NextRequest,
//   { params }: { params: { id: string } },
// ): Promise<NextResponse> {
//   const id = params.id;

//   try {
//     await dbConnect(); // connect to database

//     const doc = await Doc.findById(id);

//     if (!doc) {
//       return NextResponse.json({
//         status: 404,
//         message: `Document ${id} not found`,
//       });
//     }

//     await Doc.findByIdAndDelete(id);

//     return NextResponse.json({ message: "Document deleted" });
//   } catch (error) {
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }
