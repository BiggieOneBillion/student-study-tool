import { dbConnect } from "@/lib/db";
import User from "@/models/user";
import { NextResponse, NextRequest } from "next/server";

interface Iinfo {
  id: string;
  Courses: string;
  Learn: string[];
  quiz?: { title: string; isDone: boolean }[];
}

export async function POST( // save study plan
  request: NextRequest,
  { params }: { params: { userId: string } },
): Promise<NextResponse> {
  const body = await request.json();
  const { userId } = params;

  try {
    await dbConnect(); // connect to database

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({
        status: 404,
        message: `User ${userId} not found`,
      });
    }

    if (user) {
      if (user.studyMaterials) {
        // user.studyMaterials.push(body);
        // fisrt check if the study plan already exist, by checking the topic and level

        const studyPlanExist: boolean = user.studyMaterials.some(
          (studyPlan: { topic: string; level: string }) =>
            studyPlan.topic === body.topic && studyPlan.level === body.level,
        );
        if (studyPlanExist) {
          return NextResponse.json(
            {
              message: "Study plan already exist",
            },
            { status: 400 },
          );
        }
        body.info = body.info.map((el: Iinfo, j: number) => {
          const quiz: { title: string; isDone: boolean }[] = [];

          if (j === 0) {
            for (let i = 0; i < el.Learn.length; i++) {
              if (i === 0) {
                const input = {
                  title: el.Learn[i],
                  isDone: true,
                };
                quiz.push(input);
              } else {
                const input = {
                  title: el.Learn[i],
                  isDone: false,
                };
                quiz.push(input);
              }
            }
          } else {
            for (let i = 0; i < el.Learn.length; i++) {
              const input = {
                title: el.Learn[i],
                isDone: false,
              };
              quiz.push(input);
            }
          }

          el.quiz = quiz;

          return el;
        });
        user.studyMaterials.push(body);
      } else {
        user.studyMaterials = [body];
      }
    }
    await user.save();
    return NextResponse.json({ message: "Study plan added" });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PUT( // update study plan
  request: NextRequest,
  { params }: { params: { userId: string } },
): Promise<NextResponse> {
  const body = await request.json();
  const { userId } = params;

  try {
    await dbConnect(); // connect to database

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({
        status: 404,
        message: `User ${userId} not found`,
      });
    } else {
      if (user.studyMaterials) {
        // user.studyMaterials.push(body);
        // fisrt check if the study plan already exist, by checking the topic and level

        const studyPlanExist = user.studyMaterials.find(
          (studyPlan: { topic: string; level: string }) =>
            studyPlan.topic === body.topic && studyPlan.level === body.level,
        );
        // console.log("studyPlanExist", studyPlanExist);

        if (studyPlanExist) {
          user.studyMaterials = user.studyMaterials.map(
            (studyPlan: { topic: string; level: string }) => {
              if (
                studyPlan.topic === body.topic &&
                studyPlan.level === body.level
              ) {
                return body;
              }
              return studyPlan;
            },
          );
          // save the plan
          await user.save();
          // return a success message
          return NextResponse.json({ message: "Study plan added" });
        }

        return NextResponse.json(
          {
            message: "Study plan does not already exist",
          },
          { status: 400 },
        );
      }
      return NextResponse.json({ message: "Server Error" }, { status: 415 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export async function GET( // get all study plan
  request: NextRequest,
  { params }: { params: { userId: string } },
): Promise<NextResponse> {
  const { userId } = params;

  // console.log("userId", userId);

  try {
    await dbConnect(); // connect to database
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({
        status: 404,
        message: `User ${userId} not found`,
      });
    }

    return NextResponse.json(user.studyMaterials);
  } catch (error) {
    // console.log("error", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
