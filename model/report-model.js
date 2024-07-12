import { Schema, models, model } from "mongoose";

const reportSchema = new Schema({
  totalCompletedLessons: [Schema.ObjectId],
  totalCompletedModules: [Schema.ObjectId],
  student: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  course: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  quizAssessment: {
    type: Schema.ObjectId,
    required: true,
    ref: "Assessment",
  },
  createdAt: { type: Date, default: Date.now },
});

export const Report = models.Report ?? model("Report", reportSchema);
