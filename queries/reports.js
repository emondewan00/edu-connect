"use server";
import connectDB from "@/lib/connectDB";
import { replaceMongoIdInObject } from "@/lib/convertData";
import { Assessment } from "@/model/assessment-model";
import { Report } from "@/model/report-model";

export const getReportByUserIdAndCourseId = async (filter) => {
  await connectDB();
  const report = await Report.findOne(filter)
    .populate({
      path: "quizAssessment",
      model: Assessment,
    })
    .lean();
  return replaceMongoIdInObject(report);
};
