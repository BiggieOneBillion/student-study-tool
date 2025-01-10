import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function PUT( // update study plan
  request: NextRequest,
  { params }: { params: { userId: string; materialId: string } },
): Promise<NextResponse> {
  const body = await request.json();
  const { userId, materialId } = params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({
        status: 404,
        message: `User ${userId} not found`,
      });
    }

    if (user) {
      // get the studyMaterials and find the index of the study plan to update
      const index = user.studyMaterials?.findIndex(
        (studyPlan: { id: string }) => studyPlan.id === materialId,
      );
      // get the index and use it to get the study plan to update so we can update it
      if (user.studyMaterials && index !== undefined && index !== -1) {
        user.studyMaterials[index] = body;
      }
      // save the updated study plan and return a success message
      await user.save();
    }
    return NextResponse.json({ message: "Study plan updated" });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { userId: string; materialId: string } },
): Promise<NextResponse> {
  const { userId, materialId } = params;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({
        status: 404,
        message: `User ${userId} not found`,
      });
    }

    if (user) {
      // get the studyMaterials and find the index of the study plan to delete
      const index = user.studyMaterials?.findIndex(
        (studyPlan: { id: string }) => studyPlan.id === materialId,
      );
      // get the index and use it to get the study plan to delete, so we can delete it.
      if (user.studyMaterials && index !== undefined && index !== -1) {
        user.studyMaterials[index] = user.studyMaterials.filter(
          (el: string) => el !== materialId,
        );
      } else {
        return NextResponse.json({
          status: 404,
          message: `Material ${materialId} not found`,
        });
      }
      // save the updated study plan and return a success message
      await user.save();
    }
    return NextResponse.json({ message: "Study plan updated" });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
