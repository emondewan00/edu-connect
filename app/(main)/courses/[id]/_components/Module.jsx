import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Clock10,
  Video,
} from "lucide-react";
import Lesson from "./Lesson";

const Module = ({ module, ids, idx }) => {

  return (
    <AccordionItem className="border-none" value={ids[idx]}>
      <AccordionTrigger>{module?.title}</AccordionTrigger>
      <AccordionContent>
        {/* header */}
        <div class="flex gap-x-5 items-center flex-wrap mt-4 mb-6 text-gray-600 text-sm">
          <span className="flex items-center gap-1.5">
            <Video className="w-4 h-4" />
            {module?.lessonIds?.length} Lessons
          </span>
          <span className="flex items-center gap-1.5">
            <Clock10 className="w-4 h-4" />
            {(module.duration / 60).toPrecision(2)}+ Hours
          </span>
        </div>

        <div className="space-y-3">
          {module?.lessonIds?.map((lesson) => (
            <Lesson key={lesson} id={lesson} />
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default Module;
