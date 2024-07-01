import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { CheckCheck } from "lucide-react";
import { Presentation } from "lucide-react";
import { UsersRound } from "lucide-react";
import { Star } from "lucide-react";
import { MessageSquare } from "lucide-react";
import { BookCheck } from "lucide-react";
import { Clock10 } from "lucide-react";
import { Radio } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Video } from "lucide-react";
import { NotepadText } from "lucide-react";
import { FileQuestion } from "lucide-react";
import { Tv } from "lucide-react";
import { StickyNote } from "lucide-react";
import Image from "next/image";
import Overview from "./Overview";
import Curriculum from "./Curriculum";
import Instructor from "./Instructor";

const CourseDetails = ({ course }) => {
  const { title, subtitle, category, instructor, modifiedOn } = course;
  const { profilePicture, first_name, last_name } = instructor;
  return (
    <section className="py-8 md:py-12 lg:py-24">
      <div className="container">
        <span className="bg-success px-4 py-0.5 rounded-full text-xs font-medium text-white inline-block">
          {category.title}
        </span>
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold 2xl:text-5xl mt-3">
          {title}
        </h3>
        <p className="mt-3 text-gray-600 text-sm">{subtitle}</p>
        {/*  */}
        <div className="flex sm:items-center gap-5 flex-col sm:flex-row sm:gap-6 md:gap-20 mt-6">
          <div className="flex items-center gap-2">
            <Image
              width={40}
              height={40}
              className="w-[40px] h-[40px] rounded-full"
              src={profilePicture}
              alt={first_name}
            />
            <p className="font-bold">{first_name + " " + last_name}</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-success font-semibold">Last Updated: </span>
            <span>Feb 22, 2022</span>
          </div>
        </div>

        {/* Tab */}
        <div className="my-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 my-6 max-w-[768px]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum </TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
              {/* <TabsTrigger value="reviews">Reviews</TabsTrigger> */}
            </TabsList>
            <TabsContent value="overview">
              {/* each tab content can be independent component */}
              <Overview />
            </TabsContent>
            <TabsContent value="curriculum">
              {/* each tab content can be independent component */}
              <Curriculum />
            </TabsContent>
            <TabsContent value="instructor">
              {/* each tab content can be independent component */}
              <Instructor />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;
