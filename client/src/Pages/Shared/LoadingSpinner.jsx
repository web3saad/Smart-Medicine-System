import Lottie from "lottie-react";
import animationlottie2 from "../../assets/animation/loading.json";
const LoadingSpinner = () => {
  return (
    <div className="py-40 px-20">
      <div className="w-1/8  mb-10 md:mb-0 mx-auto">
        <Lottie animationData={animationlottie2} loop={true} />
      </div>
    </div>
  );
};

export default LoadingSpinner;
