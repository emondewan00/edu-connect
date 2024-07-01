import { replaceMongoIdInObject } from "@/lib/convertData";
import { Lesson } from "@/model/lesson-model";

export const getLesson = async (id) => {
  const lesson = await Lesson.findById(id).lean();
  return replaceMongoIdInObject(lesson);
};
