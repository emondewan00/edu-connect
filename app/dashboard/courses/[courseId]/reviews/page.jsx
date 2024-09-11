import { getCourse } from "@/queries/courses";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { getInstructorDashboard, REVIEW_DATA } from "@/lib/dashboard-helper";

const ReviewsPage = async ({ params: { courseId } }) => {
  const course = await getCourse(courseId);
  const reviewsData = await getInstructorDashboard(REVIEW_DATA);
  const reviews = reviewsData.filter(
    (review) => review.courseId.toString() == courseId
  );
  
  return (
    <div className="p-6">
      <h2>{course.title}</h2>
      <DataTable columns={columns} data={reviews} />
    </div>
  );
};

export default ReviewsPage;
