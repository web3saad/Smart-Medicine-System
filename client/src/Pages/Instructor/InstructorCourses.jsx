/* eslint-disable no-unused-vars */
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useSingleInstructorCourses from "../../Hooks/useSingleInstructorCourses";
import InstructorCourseCard from "../Shared/InstructorCourseCard";
import LoadingSpinner from "../Shared/LoadingSpinner";

const InstructorCourses = () => {
  const { id } = useParams();
  useEffect(() => {
    AOS.init();
  }, []);

  const [courses, loading, refetch] = useSingleInstructorCourses(id);



  if (loading) {
    return <LoadingSpinner />;
  }

  const courseArray = courses?.data;


  if (loading) {
    return <LoadingSpinner />;
  }

  if (!courseArray) {
    return <div>No instructors available.</div>;
  }


  if (!Array.isArray(courseArray)) {
    return <div>No instructors available.</div>;
  }


  const instructorName = courseArray[0]?.instructor?.name?.firstName;
  
  return (
    <div>
      <SectionTitle
        data-aos="fade-right"
        data-aos-duration="7000"
        heading={`Courses of  ${instructorName}`}
      ></SectionTitle>
      <div
        data-aos="fade-up"
        data-aos-duration="2000"
        className="flex justify-center  container mx-auto mb-5    px-4"
      >
        <div className="grid  mt-4 md:grid-cols-2 lg:grid-cols-3  gap-5">
          {courseArray.map((course) => (
            <InstructorCourseCard
              key={course._id}
              course={course}
            ></InstructorCourseCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorCourses;
