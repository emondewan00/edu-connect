import { Course } from "@/model/course-model";

export const getCourses = async () => {
  const courses = await Course.find().populate({
    path: "category",
    model: "category",
  });
  console.log(courses);
  return courses;
};
