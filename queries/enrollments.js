import connectDB from "@/lib/connectDB";
import { replaceMongoIdInArray } from "@/lib/convertData";
import { Course } from "@/model/course-model";
import { Enrollment } from "@/model/enrollment-model";

export const getEnrollmentsByUserId = async (userId) => {
  await connectDB();
  const enrollments = await Enrollment.find({ student: userId })
    .populate({
      path: "course",
      model: Course,
    })
    .lean();
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
  if (findIfExists?._id) return { alreadyEnrolled: true };

  await Enrollment.create(course);
  return { alreadyEnrolled: false };
};


