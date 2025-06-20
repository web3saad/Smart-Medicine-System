/* eslint-disable no-unused-vars */
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";

import Lottie from "lottie-react";

import academic from "../../assets/animation/108347-designer.json";
import art from "../../assets/animation/110586-line-art.json";
import sports from "../../assets/animation/61182-ball-sport.json";
import specialized from "../../assets/animation/77349-creativity.json";
import programming from "../../assets/animation/programming-animation.json";

const HomeCoursesCategory = () => {
  const cardData = [
    {
      linkTo: "courses/lifeskills",
      animationData: programming,
      cardTitle: "Life Skills",
    },
    {
      linkTo: "courses/sports",
      animationData: sports,
      cardTitle: "Sports and Fitness",
    },

    {
      linkTo: "courses/art",
      animationData: art,
      cardTitle: "Arts and Creativity",
    },
    {
      linkTo: "courses/specialized-interest ",
      animationData: specialized,
      cardTitle: "Specialized Interests",
    },
    {
      linkTo: "courses/academic-enrichment",
      animationData: academic,
      cardTitle: "Academic Enrichment",
    },
  ];

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div>
      <SectionTitle
        data-aos="fade-right"
        data-aos-duration="7000"
        heading={"Courses Categories "}
      ></SectionTitle>
      <div
        data-aos="fade-up"
        data-aos-duration="2000"
        className="flex justify-center  container mx-auto mb-5    px-4"
      >
        <div className="flex justify-center px-4">
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {cardData.map((card, index) => (
              <Link to={card.linkTo} key={index}>
                {/* <div className="card w-64 bg-base-100 shadow-xl hover:shadow-3xl "> */}
                <div className="card w-64 bg-base-100 shadow-xl hover:shadow-3xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                  <div className="card-animation px-4">
                    <Lottie animationData={card.animationData} loop={true} />
                  </div>
                  <figure className="">
                    <Lottie
                      src={card?.imageSrc}
                      alt={card.cardTitle}
                      className="rounded-xl transition-transform duration-300 hover:scale-110"
                    />
                  </figure>
                  <div className="card-body items-center text-center">
                    <p className="card-title  text-teal-400 ">
                      {card.cardTitle}
                    </p>
                  </div>
                </div>

              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCoursesCategory;
