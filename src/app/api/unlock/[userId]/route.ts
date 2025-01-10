import { dbConnect } from "@/lib/db";
import User from "@/models/user";
import { NextResponse, NextRequest } from "next/server";

// interface Iinfo {
//   id: string;
//   Courses: string;
//   Learn: string[];
//   quiz?: { title: string; isDone: boolean }[];
// }

export async function PUT(
  request: NextRequest,
  { params }: { params: { userId: string } },
): Promise<NextResponse> {
  const { userId } = params;
  const body = await request.json();

  const { studyPlan, infoIndex, quizTitle } = body;

  if (!studyPlan || infoIndex === undefined || !quizTitle) {
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 },
    );
  }

  try {
    await dbConnect();

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({
        status: 401,
        message: `User ${userId} not found`,
      });
    }

    // console.log("STUDY PLAN-------", studyPlan);

    const planIndex = user.studyMaterials.findIndex(
      (plan: { topic: string; level: string }) =>
        plan.topic === studyPlan.topic && plan.level === studyPlan.level,
    );

    // console.log("MATERIAL----", user.studyMaterials);

    if (planIndex === -1) {
      return NextResponse.json(
        { message: "Study plan not found" },
        { status: 402 },
      );
    }

    const targetPlan = user.studyMaterials[planIndex];
    const targetInfo = targetPlan.info[infoIndex];

    if (!targetInfo || !Array.isArray(targetInfo.quiz)) {
      return NextResponse.json(
        { message: "Invalid info index or quiz data" },
        { status: 400 },
      );
    }

    const quizIndex = targetInfo.quiz.findIndex(
      (quiz: { title: string }) => quiz.title === quizTitle,
    );

    if (quizIndex === -1) {
      return NextResponse.json({ message: "Quiz not found" }, { status: 403 });
    }

    // Check if there's another quiz in the same info object
    if (quizIndex + 1 < targetInfo.quiz.length) {
      targetInfo.quiz[quizIndex + 1].isDone = true;
      // console.log(targetInfo.quiz[quizIndex + 1]);
    } else {
      // Check for the next object in the info arr
      if (infoIndex + 1 < targetPlan.info.length) {
        const nextInfoObj = targetPlan.info[infoIndex + 1];
        // console.log("Na we dey here");

        if (nextInfoObj.quiz) {
          const nextQuizItem = nextInfoObj.quiz[0];

          if (Object.keys(nextQuizItem).length > 0) {
            // Unlock the first quiz in the next studyMaterial's first info object
            nextQuizItem.isDone = true;
          } else {
            return NextResponse.json(
              { message: "Next study plan does not have valid quizzes" },
              { status: 408 },
            );
          }
        } else {
          return NextResponse.json(
            { message: "Next study plan does not have valid info objects" },
            { status: 410 },
          );
        }
      } else {
        return NextResponse.json(
          { message: "No subsequent quiz or study plan to unlock" },
          { status: 412 },
        );
      }
    }

    // Use findOneAndUpdate to save the changes
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { studyMaterials: user.studyMaterials },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      return NextResponse.json(
        { message: "Failed to update user" },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: "Next lesson unlocked" });
  } catch (error) {
    console.error("Error updating study plan:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
