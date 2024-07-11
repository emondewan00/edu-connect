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
  quizAssignment: {
    type: Schema.ObjectId,
    ref: "QuizAssessment",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

export const Report = models.Report ?? model("Report", reportSchema);
