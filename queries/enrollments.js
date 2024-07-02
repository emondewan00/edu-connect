import { replaceMongoIdInArray } from "@/lib/convertData";
import { Enrollment } from "@/model/enrollment-model";

export const getEnrollmentsByUserId = async (userId) => {
  const enrollments = await Enrollment.find({ user: userId }).lean();
  return replaceMongoIdInArray(enrollments);
};

export const getEnrollmentsByCourseId = async (courseId) => {
  const enrollments = await Enrollment.find({ course: courseId }).lean();
  return replaceMongoIdInArray(enrollments);
};
