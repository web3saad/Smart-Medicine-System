import AOS from "aos";
import "aos/dist/aos.css";
import Lottie from "lottie-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import animationlottie2 from "../../assets/animation/orderConfirmed.json";


const OrderConfirmed = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className=" flex  py-20 bg-base-300 ">
      <div className=" mt-10  p-10 mx-auto">
        <div
          data-aos="fade-left"
          data-aos-duration="800"
          className=" w-96 mb-10"
        >
          <Lottie animationData={animationlottie2} loop={true} />
        </div>
        <div
          data-aos="fade-right"
          data-aos-duration="800"
          className="w-full mb-10 md:mb-0 mx-auto"
        >
          <Link to="/dashboard">
            <button className="btn capitalize btn-sm btn-info">
              Go to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default OrderConfirmed;
