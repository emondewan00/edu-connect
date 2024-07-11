import { Schema, model, models } from "mongoose";

const quizAssessmentSchema = new Schema(
  {
    quizId: {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    options: [
      {
        option: {
          type: String,
          required: true,
        },
        isCorrect: {
          type: Boolean,
          required: true,
        },
        selected: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    _id: false,
    versionKey: false,
  }
);

const assessmentSchema = new Schema({
  mark: {
    type: Number,
    required: true,
  },
  noc: {
    type: Number,
    required: true,
  },
  assessments: [quizAssessmentSchema],
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
});

export const Assessment =
  models.Assessment ?? model("Assessment", assessmentSchema);
