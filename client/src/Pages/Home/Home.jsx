import { Helmet } from "react-helmet-async";
import BabyCare from "./BabyCare";
import Banner from "./Banner";
import FAQ from "./FAQ";
import FiverAndPain from "./FiverAndPain";
import PetMedicine from "./PetMedicine";

const Home = () => {
  return (
    <div className="bg-base-00">
      <Helmet>
        <title> E-Medicine | Home</title>
      </Helmet>

      <Banner />
      <p className="lg:text-xl text-sm font-bold underline flex justify-center mt-5 ">
        Our Products{" "}
      </p>
      <FiverAndPain />
      <BabyCare />
      <PetMedicine />
      <FAQ />
    </div>
  );
};

export default Home;
