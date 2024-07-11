"use server";
import connectDB from "@/lib/connectDB";
import { replaceMongoIdInObject } from "@/lib/convertData";
import { QuizAssessment } from "@/model/quizAssessment-model";
import { Report } from "@/model/report-model";

export const getReportByUserIdAndCourseId = async (filter) => {
  await connectDB();
  const report = await Report.findOne(filter)
    .populate({
      path: "quizAssessment",
      model: QuizAssessment,
    })
    .lean();
  return replaceMongoIdInObject(report);
};
