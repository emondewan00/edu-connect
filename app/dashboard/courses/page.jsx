import { COURSE_DATA, getInstructorDashboard } from "@/lib/dashboard-helper";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

const CoursesPage = async () => {
  const data = await getInstructorDashboard(COURSE_DATA);

  return (
    <div className="p-6">
      {/* <Link href="/teacher/create">
        <Button>New Course</Button>
      </Link> */}
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default CoursesPage;
