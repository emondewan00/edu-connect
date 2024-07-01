import { Accordion } from "@/components/ui/accordion";
import { BookCheck, Clock10, Radio } from "lucide-react";
import Module from "./Module";

const Curriculum = ({ course }) => {
  const ids = course.modules.reduce((acc, module) => {
    return [...acc, module?._id?.toString()];
  }, []);
  const totalDuration = course?.modules.reduce(function (acc, obj) {
    return acc + obj.duration;
  }, 0);
  return (
    <>
      <div class="flex gap-x-5 items-center justify-center flex-wrap mt-4 mb-6 text-gray-600 text-sm">
        <span className="flex items-center gap-1.5">
          <BookCheck className="w-4 h-4" />
          {course?.modules?.length} Chapters
        </span>
        <span className="flex items-center gap-1.5">
          <Clock10 className="w-4 h-4" />
          {(totalDuration / 60).toPrecision(2)}+ Hours
        </span>
        <span className="flex items-center gap-1.5">
          <Radio className="w-4 h-4" />4 Live Class
        </span>
      </div>

      {/* contents */}
      <Accordion
        defaultValue={ids}
        type="multiple"
        collapsible
        className="w-full"
      >
        {course?.modules.map((module, idx) => (
          <Module key={module?._id} ids={ids} idx={idx} module={module} />
        ))}
      </Accordion>
      {/* contents end */}
    </>
  );
};

export default Curriculum;
