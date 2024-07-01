import mongoose, { Schema } from "mongoose";

const lessonSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  video_url: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    required: true,
    default: false,
  },
  slug: {
    type: String,
    required: true,
  },
  access: {
    type: String,
    enum: ["public", "private"],
    default: "public",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export const Lesson =
  mongoose.models.Lesson ?? mongoose.model("Lesson", lessonSchema);
