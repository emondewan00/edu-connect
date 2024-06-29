import connectDB from "@/lib/connectDB";
import { getCourses } from "@/queries/courses";

export default async function Home() {
  await connectDB();
  const courses = await getCourses();
  return <div>hello home </div>;
}
