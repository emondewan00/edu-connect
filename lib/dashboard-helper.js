import { auth } from "@/auth";
import { getUserById } from "@/queries/users";
import { getCourseByInstructor } from "@/queries/courses";

export const COURSE_DATA = "course";
export const ENROLLMENT_DATA = "enrollment";
export const REVIEW_DATA = "review";

const populateReviewData = async (data) => {
  const populatedReviewData = await Promise.all(
    data.map(async (review) => {
      const student = await getUserById(review.user.id);
      review["studentName"] = `${student.first_name} ${student.last_name}`;
      return review;
    })
  );
  return populatedReviewData;
};

export async function getInstructorDashboard(dataType) {
  try {
    const session = await auth();
    const instructor = await getUserById(session.user.id);
    const coursesStatus = await getCourseByInstructor(instructor.id, true);

    switch (dataType) {
      case COURSE_DATA:
        return coursesStatus.courses;
      case ENROLLMENT_DATA:
        return coursesStatus.enrollments;
      case REVIEW_DATA:
        return populateReviewData(coursesStatus.reviews);
      default:
        return coursesStatus;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get instructor dashboard data");
  }
}
