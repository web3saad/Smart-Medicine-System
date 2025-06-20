import AOS from "aos";
import "aos/dist/aos.css";
import Lottie from "lottie-react";
import { useEffect } from "react";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import animationlottie2 from "../../assets/animation/faq.json";

import animationlottie1 from "../../assets/animation/loading.json";

const questions = [
  {
    title: "What is the E-Medicine Shop?",
    content:
      "The E-Medicine Shop is an online platform that offers a wide range of medical products and healthcare supplies. It provides a convenient and accessible way to purchase essential health-related items from the comfort of your home.",
  },
  {
    title: "How do I browse and find products on the E-Medicine Shop?",
    content:
      "You can easily browse and find products on the E-Medicine Shop by visiting our website. Use the search bar or navigate through different categories to discover a variety of medical supplies, medicines, equipment, and wellness products.",
  },
  {
    title: "How can I place an order?",
    content:
      "To place an order on the E-Medicine Shop, follow these steps:\n\n1. Browse the website and add desired products to your cart.\n2. Review your cart to ensure all selected items are accurate.\n3. Proceed to checkout, where you'll provide shipping and payment details.\n4. Review your order summary and confirm the purchase.\n\nOnce your order is placed, you'll receive a confirmation email with tracking information.",
  },
  {
    title: "What payment methods are accepted?",
    content:
      "We currently accept only cash on delivery You can choose the option that's most convenient for you during the checkout process.",
  },
  {
    title: "Is my personal and payment information secure?",
    content:
      "Yes, we prioritize the security of your personal and payment information. Our website uses industry-standard encryption and security measures to protect your data. Your information is handled securely and will not be shared with third parties.",
  },
  {
    title: "Can I track the status of my order?",
    content:
      "Absolutely. Once your order is confirmed, you'll receive a tracking number via email. You can use this tracking number to monitor the status and delivery progress of your order through our website or the designated courier's tracking service.",
  },
  {
    title: "What if I have an issue with my order or need assistance?",
    content:
      "If you encounter any issues with your order or need assistance, our customer support team is here to help. You can reach out to us through the contact information provided on our website. We strive to provide timely and effective support to ensure a positive shopping experience.",
  },
  {
    title: "Can I request a specific product that is not currently listed?",
    content:
      "Yes, we value your feedback and needs. If you're looking for a specific medical product that is not currently available on our shop, you can submit a product request through our website. Our team will review your request and make efforts to expand our product offerings.",
  },
 
];


const FAQ = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const durationStep = 500;
  const initialDuration = 200;

  const aosProperties = questions.map((question, index) => ({
    property: "fade-up",
    duration: initialDuration + index * durationStep,
  }));

  return (
    <>
      <SectionTitle heading={"Frequently Asked Question"}></SectionTitle>

      <div className="lg:grid mt-10 lg:grid-cols-2 p-10 mx-auto flex flex-col-reverse ">
        <div
          data-aos="fade-right"
          data-aos-duration="800"
          className="w-1/8 mb-10 md:mb-0 mx-auto"
        >
          <Lottie animationData={animationlottie2} loop={true} />
        </div>

        <div>
          {questions.map((question, index) => (
            <div
              key={index}
              data-aos={aosProperties[index]?.property}
              data-aos-duration={aosProperties[index]?.duration}
              tabIndex={0}
              className="collapse collapse-arrow border-2 border-sky-500  m-2 rounded-box"
            >
              <div className="collapse-title text-xl font-semibold">
                {question.title}
              </div>
              <div className="collapse-content">
                <p className="text-sm font-semibold text-yellow-500">
                  {question.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default FAQ;
