"use server";
import { create } from "@/queries/courses";
import { auth } from "@/auth";
export async function createCourse(data) {
  try {
    const session = await auth();
    const course = await create({ ...data, instructor: session.user.id });
    return { message: "Course created successfully", ok: true, course };
  } catch (err) {
    console.error(err);
    throw Error("Error creating course");
  }
}
