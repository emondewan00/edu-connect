import connectDB from "@/lib/connectDB";
import { replaceMongoIdInArray } from "@/lib/convertData";
import { Enrollment } from "@/model/enrollment-model";

export const getEnrollmentsByUserId = async (userId) => {
  await connectDB();
  const enrollments = await Enrollment.find({ user: userId }).lean();
  return replaceMongoIdInArray(enrollments);
};

export const getEnrollmentsByCourseId = async (courseId) => {
  await connectDB();
  const enrollments = await Enrollment.find({ course: courseId }).lean();
  return replaceMongoIdInArray(enrollments);
};

export const enrollCourse = async (course) => {
  await connectDB();
  const findIfExists = await Enrollment.findOne({
    course: course.course,
    student: course.student,
  }).lean();
  if (findIfExists._id) return "already enrolled ";

  await Enrollment.create(course);
  return "Enrolled successfully";
};
