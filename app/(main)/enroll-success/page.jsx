import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
import { getCourse } from "@/queries/courses";
import { enrollCourse } from "@/queries/enrollments";
import { getUserById } from "@/queries/users";
import { CircleCheck } from "lucide-react";
import Link from "next/link";

const Success = async ({ searchParams: { session_id, course_id } }) => {
  const userSession = await auth();
  if (!session_id) {
    throw new Error("Please provide a valid session");
  }

  const course = await getCourse(course_id);
  const user = await getUserById(userSession.user.id);
  const userName = user.first_name + " " + user.last_name;

  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const paymentIntent = checkoutSession.payment_intent;
  const paymentStatus = checkoutSession.status;

  if (paymentStatus === "complete") {
    const enrollData = {
      enrollment_data: Date.now(),
      status: "not-started",
      method: "stripe",
      course: course_id,
      student: user?.id,
    };

    const enrolled = await enrollCourse(enrollData);

    console.log(enrolled, "complete");
    

    // Add logic to save the payment intent ID to the database
    // or update the course enrollment status
    // You can also send an email confirmation to the user
  }

  return (
    <div className="h-full w-full flex-1 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6 max-w-[600px] text-center">
        <CircleCheck className="w-32 h-32 bg-success rounded-full p-0 text-white" />
        {
          <h1 className="text-xl md:text-2xl lg:text-3xl">
            Congratulations, <strong>{userName}</strong>! Your Enrollment was
            Successful for this course <strong>{course?.title}</strong>
          </h1>
        }
        <div className="flex items-center gap-3">
          <Button asChild size="sm">
            <Link href="/courses">Browse Courses</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/think-in-a-redux-way/introduction">Play Course</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Success;
