import { auth } from "@/auth";
import { getUserById } from "@/queries/users";
import { getCourseByInstructor } from "@/queries/courses";

export async function getInstructorDashboard() {
  try {
    const session = await auth();
    const instructor = await getUserById(session.user.id);
    const coursesStatus = await getCourseByInstructor(instructor.id, true);
    return coursesStatus;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get instructor dashboard data");
  }
}
