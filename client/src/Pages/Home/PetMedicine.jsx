import { useGetProductsQuery } from "../../redux/features/product/productApi";
import ProductCategorySwiper from "./ProductCategorySwiper";
import { filterProductsByCategory } from "./ProductFilter";

// Example for Pet Medicine
const PetMedicine = () => {
  const { data } = useGetProductsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const products = data?.data;
  const petMedicineProducts = filterProductsByCategory(
    products,
    "Pet Medicine"
  );

  return (
    <ProductCategorySwiper
      SectionTitle="Pet Medicine"
      category="Pet Medicine"
      products={petMedicineProducts}
    />
  );
};

export default PetMedicine;
