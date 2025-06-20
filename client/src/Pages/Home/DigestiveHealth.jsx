import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination } from "swiper";
import { useGetProductsQuery } from "../../redux/features/course/courseApi";
import HomePageCard from "../products/HomePageCard";
import { filterProductsByCategory } from "./ProductFilter";

const DigestiveHealth = () => {
  const { data } = useGetProductsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const products = data?.data;

  const babyCareProducts = filterProductsByCategory(
    products,
    "Digestive Health"
  );

  return (
    <div className="container px-5">
      <div className="flex justify-between mb-5">
        <p className="text-xl font-semibold text-red-500">Baby Care Products</p>
        <button className="btn btn-primary ">See more</button>
      </div>

      <Swiper
        slidesPerView={4}
        spaceBetween={1}
        autoplay={true}
        modules={[Pagination]}
        className="mySwiper"
      >
        {babyCareProducts?.slice(0, 5).map((product) => (
          <SwiperSlide key={product?._id}>
            {" "}
            <HomePageCard key={product?._id} product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DigestiveHealth;
