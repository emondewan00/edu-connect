import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  modules: [
    {
      type: [Schema.Types.ObjectId],
      ref: "Module",
    },
  ],
  price: {
    type: Number,
    min: 0,
    default: 0,
  },
  active: {
    type: Boolean,
    default: false,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  instructor: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  testimonials: [
    {
      type: Schema.Types.ObjectId,
      ref: "Testimonial",
    },
  ],
  quizSet: {
    type: Schema.Types.ObjectId,
    ref: "QuizSet",
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
  learning: [
    {
      type: String,
      required: true,
    },
  ],
  modifiedOn: {
    type: Date,
    default: Date.now(),
  },
});

export const Course =
  mongoose.models.Course ?? mongoose.model("Course", courseSchema);
