import { Course } from "@/model/course-model";
import { Category } from "@/model/category-model";
import { User } from "@/model/user-model";
import { Testimonial } from "@/model/testimonial-model";
import { Module } from "@/model/module-model";
import {
  replaceMongoIdInArray,
} from "@/lib/convertData";
import { getEnrollmentsByCourseId } from "./enrollments";
import { getTestimonialsByCourseId } from "./testimonial";
export const getCourses = async () => {
  const courses = await Course.find()
    .populate({
      path: "category",
      model: Category,
    })
    .populate({
      path: "instructor",
      model: User,
    })
    .populate({
      path: "modules",
      model: Module,
    })
    .populate({
      path: "testimonials",
      model: Testimonial,
    })
    .lean();
  return replaceMongoIdInArray(courses);
};

export const getCourse = async (id) => {
  const course = await Course.findById(id)
    .populate({
      path: "category",
      model: Category,
    })
    .populate({
      path: "instructor",
      model: User,
    })
    .populate({
      path: "modules",
      model: Module,
    })
    .populate({
      path: "testimonials",
      model: Testimonial,
      populate: {
        path: "user",
        model: User,
      },
    })
    .lean();
  return course;
};

export const getCourseByInstructor = async (id) => {
  const courses = await Course.find({ instructor: id }).lean();
  const enrollments = await Promise.all(
    courses.map(async (course) => {
      const enrollment = await getEnrollmentsByCourseId(course._id);
      return enrollment;
    })
  );
  const totalEnrollments = enrollments.reduce((totalEnrollment, enrollment) => {
    return totalEnrollment + enrollment.length;
  }, 0);
  const testimonials = await Promise.all(
    courses.map(async (course) => {
      const testimonial = await getTestimonialsByCourseId(course._id);
      return testimonial;
    })
  );

  const totalTestimonials = testimonials.flat();
  let avgTestimonials = totalTestimonials.reduce((acc, testimonial) => {
    return acc + testimonial.rating;
  }, 0);
  avgTestimonials /= totalTestimonials.length;
  return {
    courses: courses.length,
    totalEnrollments,
    reviews: totalTestimonials.length,
    ratings: avgTestimonials.toFixed(2),
  };
};
