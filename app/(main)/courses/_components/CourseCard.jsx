import Link from "next/link";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";
import { Button } from "@/components/ui/button";
import EnrollCourse from "@/components/enroll-course";

const CourseCard = ({ course }) => {
  return (
    <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full relative">
      <div className="relative w-full aspect-video rounded-md overflow-hidden">
        <Image
          src={`/assets/images/courses/${course?.thumbnail}`}
          alt={course?.title}
          className="object-cover"
          fill
        />
      </div>
      <Link
        key={course.id}
        className="absolute left-0 top-0 w-full h-full "
        href={`/courses/${course.id}`}
      ></Link>
      <div className="flex flex-col pt-2">
        <div className="text-lg md:text-base font-medium group-hover:text-sky-700 line-clamp-2">
          {course?.title}
        </div>
        <p className="text-xs text-muted-foreground">
          {course?.category?.title}
        </p>
        <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
          <div className="flex items-center gap-x-1 text-slate-500">
            <div>
              <BookOpen className="w-4" />
            </div>
            <span>{course?.modules?.length} Chapters</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 z-20 relative">
        <p className="text-md md:text-sm font-medium text-slate-700">
          {formatPrice(course?.price)}
        </p>

        <EnrollCourse variant={"ghost"} course={course} />
      </div>
    </div>
  );
};

export default CourseCard;
