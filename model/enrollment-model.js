import mongoose, { Schema } from "mongoose";

const enrollmentSchema = new Schema({
  enrollment_date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    required: true,
  },
  completion_date: {
    type: Date,
  },
  method: {
    type: String,
    enum: ["stripe", "paypal"],
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Enrollment =
  mongoose.models.Enrollment ?? mongoose.model("Enrollment", enrollmentSchema);
