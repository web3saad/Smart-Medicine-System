/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import HomePageCard from "../products/HomePageCard";



const ProductCategorySwiper = ({ category, products, SectionTitle }) => {
  return (
    <div className="lg:px-5 sm:px-1 p-5">
      <div className="divider"></div>
      <div className="flex px-10 justify-between mb-5">
        <p className="text-xl font-bold text-pink-p00">{SectionTitle}</p>
        <Link to="products/category">
          <button className="btn btn-sm capitalize btn-info">See more</button>
        </Link>
      </div>

      <div className="flex items-center justify-center container">
        <Swiper
          spaceBetween={1}
          modules={[Pagination, Autoplay]}
          freeMode={true}
          autoplay={{ delay: 2000 }}
          centeredSlides={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
              centeredSlides: true,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 10,
              centeredSlides: false,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 10,
              centeredSlides: false,
            },
          }}
          className="mySwiper"
        >
          {products?.slice(0, 10).map((product) => (
            <SwiperSlide key={product?._id} className="swiper-slide-center">
              <HomePageCard key={product?._id} product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default ProductCategorySwiper;