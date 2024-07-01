import connectDB from "@/lib/connectDB";
import { cn } from "@/lib/utils";
import { getLesson } from "@/queries/lesson";
import { StickyNote } from "lucide-react";

const Lesson = async ({ id }) => {
  await connectDB();
  const lesson = await getLesson(id);
  return (
    <button
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full"
      )}
    >
      <div className="flex items-center gap-x-2">
        <StickyNote size={16} className={cn("text-slate-500")} />
        {lesson.title}
      </div>
    </button>
  );
};

export default Lesson;
