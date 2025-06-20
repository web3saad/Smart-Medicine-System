import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";

const AboutUs = () => {
  return (
    <div className="mx-auto px-4 pt-20 ">
      <Helmet>
        <title> E-Medicine | About ❤️</title>
      </Helmet>
      <div className="hero min-h-screen ">
        <div className=" p-5">
          <SectionTitle heading={"About Us "}></SectionTitle>
          <div className=" font-bold">
            <p>
              Welcome to eMediCare – your trusted partner in pet and personal health!
            </p>
            <p>
              At eMediCare, we’re committed to making healthcare more accessible, affordable, and stress-free. 
              Whether it’s medication for your beloved pet or essential wellness products for yourself, 
              we bring the pharmacy to your fingertips with just a few clicks.
            </p>
            <p>
              🐾 Pet-Centered Care: We offer a wide range of vet-approved medications, supplements, 
              and treatments to keep your furry friends healthy and happy.
            </p>

            <p>
              🧑‍⚕️ Human Wellness, Simplified: From everyday vitamins to prescription refills, 
              our platform is designed to provide seamless access to essential healthcare products.
            </p>
            <p>
              Fast & Secure Delivery: Our reliable delivery network ensures that your medicine arrives safely and on time
               — right to your doorstep.

            </p>
            <p>
              🩺 Expert Support: Have questions? Our team of healthcare professionals and pet care experts is just a message away.
              
            </p>
          </div>
          <Link to="/login">
            {" "}
            <button className="btn btn-primary justify-center mt-5">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
