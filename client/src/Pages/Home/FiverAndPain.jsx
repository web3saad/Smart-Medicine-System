import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


import ProductCategorySwiper from "./ProductCategorySwiper";
import { filterProductsByCategory } from "./ProductFilter";
import { useGetProductsQuery } from "../../redux/features/product/productApi";

const FiverAndPain = () => {
  const { data } = useGetProductsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const products = data?.data;

  const petMedicineProducts = filterProductsByCategory(
    products,
    "Fever & Pain"
  );

  return (
    <ProductCategorySwiper
      category="Fever & Pain"
      SectionTitle="Fever & Pain"
      products={petMedicineProducts}
    />
  );
};

export default FiverAndPain;
