import connectDB from "@/lib/connectDB";
import EnrolledCourseCard from "../_components/EnrolledCourseCard";
import { getEnrollmentsByUserId } from "@/queries/enrollments";
import { auth } from "@/auth";

async function EnrolledCourses() {
  await connectDB();
  const session = await auth();
  const enrolledCourses = await getEnrollmentsByUserId(session.user.id);

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {enrolledCourses.length > 0 ? (
        enrolledCourses.map((course) => (
          <EnrolledCourseCard key={course.courseId} course={course} />
        ))
      ) : (
        <div>No enrollment found yet </div>
      )}
    </div>
  );
}

export default EnrolledCourses;
