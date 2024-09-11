"use server";
import { create } from "@/queries/courses";

export async function createCourse(data) {
  try {
    const course = await create(data);
    return { message: "Course created successfully", ok: true, course };
  } catch (err) {
    return { message: "Error creating course", ok: false, error: err.message };
  }
}
