import Fuse from "fuse.js";
import { useState } from "react";

import { useGetProductsQuery } from "../../redux/features/product/productApi";
import { setPriceRange } from "../../redux/features/product/productSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import LoadingSpinner from "../Shared/LoadingSpinner";
import ProductCard from "./ProductCard";
import BookFilter from "./ProductFilter";

const AllProductPage = () => {
  const { data, isLoading } = useGetProductsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [searchText, setSearchText] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [value, setValue] = useState(50);
  const dispatch = useAppDispatch();
  const { priceRange, status } = useAppSelector((state) => state.product);

  const booksData = data?.data;
  let filteredData = booksData;

  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleRangeChange = (event) => {
    const newValue = parseInt(event.target.value);
    setValue(newValue);
    handleSlider([newValue]);
  };

  const handleSlider = (value) => {
    dispatch(setPriceRange(value[0]));
  };

  filteredData = filteredData?.filter((item) => {
    if (status) {
      return item.status === true && item.price < priceRange;
    }
    return priceRange > 0 ? item.price < priceRange : true;
  });

  const handleGenreFilter = () => {
    let updatedData = filteredData;

    if (selectedGenre !== "") {
      updatedData = updatedData.filter((book) =>
        book?.category?.toLowerCase().includes(selectedGenre.toLowerCase())
      );
    }

    filteredData = updatedData;
  };

  handleGenreFilter();

  if (filteredData) {
    const options = {
      keys: ["name", "category", "company"],
      threshold: 0.4,
    };

    const fuse = new Fuse(filteredData, options);
    const searchResults = fuse.search(searchText);

    filteredData =
      searchResults.length > 0
        ? searchResults.map((result) => result.item)
        : filteredData;

    if (status) {
      filteredData = filteredData.filter(
        (item) => item.status === true && item.price < priceRange
      );
    } else if (priceRange > 0) {
      filteredData = filteredData.filter((item) => item.price < priceRange);
    }
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col sm:flex-row py-20">
      <div className="w-full sm:w-1/4 z-0 py-4 bg-base-200">
        <div className="sm:hidden">
          <button
            className="w-full bg-primary text-white py-2 px-4"
            onClick={toggleFilterVisibility}
          >
            Filter
          </button>
        </div>

        <div className={isFilterVisible ? "block sm:block" : "hidden sm:block"}>
        
          <BookFilter
            value={value}
            handleRangeChange={handleRangeChange}
            priceRange={priceRange}
            searchText={searchText}
            selectedGenre={selectedGenre}
            selectedYear={selectedYear}
            setSearchText={setSearchText}
            setSelectedGenre={setSelectedGenre}
            setSelectedYear={setSelectedYear}
          />
        </div>
      </div>
      <div className="w-full sm:w-3/4">
        <div className="flex justify-end mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {filteredData?.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProductPage;
