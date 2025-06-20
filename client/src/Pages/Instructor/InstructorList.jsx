/* eslint-disable no-unused-vars */
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useInstructor from "../../Hooks/useInstructor";
import InstructorCard from "../Shared/InstructorCard";
import LoadingSpinner from "../Shared/LoadingSpinner";

const SportFitness = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const [instructors, loading] = useInstructor();
  const instructorsArray = instructors?.data;

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!instructorsArray) {
    return <div>No instructors available.</div>;
  }

  if (!Array.isArray(instructorsArray)) {
    return <div>No instructors available.</div>;
  }

  return (
    <div className=" flex  justify-center">
      <Helmet>
        <title> E-Medicine | Instructors🤵‍♀️ </title>
      </Helmet>

      <div data-aos="fade-up" data-aos-duration="2000" className="py-20  ">
        <SectionTitle
          data-aos="fade-right"
          data-aos-duration="1000"
          heading={"Meet Our instructors"}
        ></SectionTitle>

        <div className="  p-5  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
          {instructorsArray?.map((instructor) => (
            <InstructorCard key={instructor.id} instructor={instructor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SportFitness;
