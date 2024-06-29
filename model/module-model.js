import mongoose, { Schema, mongo } from "mongoose";

const moduleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  slug: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  lessonsId: [
    {
      type: Schema.Types.ObjectId,
      ref: "Lesson",
      required: true,
    },
  ],
});

export const Module =
  mongoose.models.Module ?? mongoose.model("Module", moduleSchema);
