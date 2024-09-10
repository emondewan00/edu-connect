import { Badge } from "@/components/ui/badge";
import { getCategoryById } from "@/queries/categories";
import { getReportByUserIdAndCourseId } from "@/queries/reports";
import { BookOpen } from "lucide-react";
import Image from "next/image";
const EnrolledCourseCard = async ({ course }) => {
  const { title, thumbnail, category, modules, _id } = course.course;

  const categoryDetails = await getCategoryById(category);
  const report = await getReportByUserIdAndCourseId({
    course: _id,
    student: course.student,
  });
  
  // get all quizzes
  const quizzes = report?.quizAssessment?.assessments;

  const totalQuiz = quizzes?.length.toString().padStart(2, 0);

  const quizzesTaken = quizzes?.reduce(
    (acc, quiz) => (quiz?.attempted ? acc.concat(quiz) : acc),
    []
  );

  const totalQuizTaken = quizzesTaken?.length.toString().padStart(2, 0);

  const totalCorrect = quizzesTaken?.reduce((acc, quiz) => {
    const options = quiz.options;
    const correctAnswers = options.filter(
      (option) => option.isCorrect && option.isSelected
    );
    return correctAnswers?.length + acc;
  }, 0);

  const marksFormQuizzes = (totalCorrect * 5).toString().padStart(2, 0);

  const otherMarks = report?.quizAssessment?.otherMarks;

  const totalMarks = otherMarks + totalCorrect * 5;


  return (
    <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
      <div className="relative w-full aspect-video rounded-md overflow-hidden">
        <Image
          src={`/assets/images/courses/${thumbnail}`}
          alt={"course"}
          className="object-cover"
          fill
        />
      </div>
      <div className="flex flex-col pt-2">
        <div className="text-lg md:text-base font-medium group-hover:text-sky-700 line-clamp-2">
          {title}
        </div>
        <p className="text-xs text-muted-foreground">{categoryDetails.title}</p>
        <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
          <div className="flex items-center gap-x-1 text-slate-500">
            <div>
              <BookOpen className="w-4" />
            </div>
            <span>{modules.length} Chapters</span>
          </div>
        </div>
        <div className=" border-b pb-2 mb-2">
          <div className="flex items-center justify-between">
            <p className="text-md md:text-sm font-medium text-slate-700">
              Total Modules: {modules.length}
            </p>
            <p className="text-md md:text-sm font-medium text-slate-700">
              Completed Modules{" "}
              <Badge variant="success">
                {report?.totalCompletedModules?.length
                  ?.toString()
                  .padStart(2, 0)}
              </Badge>
            </p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-md md:text-sm font-medium text-slate-700">
              Total Quizzes: {totalQuiz}
            </p>

            <p className="text-md md:text-sm font-medium text-slate-700">
              Quiz taken <Badge variant="success">{totalQuizTaken}</Badge>
            </p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-md md:text-sm font-medium text-slate-700">
              Mark from Quizzes
            </p>

            <p className="text-md md:text-sm font-medium text-slate-700">
              {marksFormQuizzes}
            </p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-md md:text-sm font-medium text-slate-700">
              Others
            </p>

            <p className="text-md md:text-sm font-medium text-slate-700">
              {otherMarks?.toString().padStart(2, 0)}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-md md:text-sm font-medium text-slate-700">
            Total Marks
          </p>

          <p className="text-md md:text-sm font-medium text-slate-700">
            {totalMarks}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnrolledCourseCard;
