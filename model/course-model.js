import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  modules: [
    {
      type: [Schema.Types.ObjectId],
      ref: "Module",
    },
  ],
  price: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  active: {
    type: Boolean,
    default: true,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  instructor: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
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
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  learning: [
    {
      type: String,
      required: true,
    },
  ],
  modifiedOn: {
    type: Date,
    default: Date.now,
  },
});

export const Course =
  mongoose.models.Course ?? mongoose.model("Course", courseSchema);
