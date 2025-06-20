import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useCourses from "../../Hooks/useCourses";
import img404 from "../../assets/home/404.png";
import LoadingSpinner from "../Shared/LoadingSpinner";

const Category = () => {
  const [courses, loading] = useCourses();
  const courseArray = courses?.data?.data;
  if (loading) {
    return <LoadingSpinner/>
  }

  if (!courseArray) {
    return <div>No courses available.</div>;
  }

  return (
    <section>
      <SectionTitle heading={"NEWLY LAUNCHED COURSES"}></SectionTitle>
      <Marquee pauseOnClick speed={20}>
        <div className="flex gap-5 m-10">
          {courseArray.map((slide, index) => (
            <Link to={`/courses/${slide.id}`} key={index}>
              <div className="card w-64 border-solid border-2 border-sky-500 shadow-xl">
                <figure className="px-10 pt-10">
                  <img src={img404} alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                  <p className="card-title text-sm text-primary-focus">
                    {slide.id}
                  </p>
                  <h2 className="card-title font-bold text-base">
                    {slide.title}
                  </h2>

                  <div className="card-actions">
                  <Link to={`/courses/${slide.id}`} key={index}>
                      <button className="btn btn-outline btn-primary">
                        Show Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Marquee>

   
    </section>
  );
};

export default Category;
