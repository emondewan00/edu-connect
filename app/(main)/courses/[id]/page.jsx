import CourseIntro from "./_components/CourseIntro";
import CourseDetails from "./_components/CourseDetails";
import Testimonials from "./_components/Testimonials";
import RelatedCourses from "./_components/RelatedCourses";
import { getCourse } from "@/queries/courses";
import connectDB from "@/lib/connectDB";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/convertData";

const SingleCoursePage = async ({ params: { id } }) => {
  await connectDB();
  let course = await getCourse(id);
  course = replaceMongoIdInObject(course);
  
  return (
    <>
      <CourseIntro course={course} />
      <CourseDetails course={course} />
      {/* Testimonials */}

      {course.testimonials.length > 0 && (
        <Testimonials
          testimonials={replaceMongoIdInArray(course.testimonials)}
        />
      )}

      {/* Related Course */}
      <RelatedCourses />
      {/* Authors */}
      {/* https://avatars.githubusercontent.com/u/1416832?v=4 */}
      {/* https://avatars.githubusercontent.com/u/3633137?v=4 */}
    </>
  );
};
export default SingleCoursePage;
