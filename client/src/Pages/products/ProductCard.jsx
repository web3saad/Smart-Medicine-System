/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import { toast } from "react-hot-toast";
import defaultImage from "../../assets/coursephoto/p1.jpg";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { useAppDispatch } from "../../redux/hook";

const ProductCard = ({ product }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = async (course) => {
    dispatch(addToCart(course));
    toast.success("Product Added to Cart Successfully!");
  };

  return (
    <div className="cursor-pointer	 card w-auto h-72 p-1 border-solid border border-sky-500  transform hover:-translate-y-1 transition-all duration-50">
      <figure className="px-6 pt-2 relative group overflow-hidden hover:scale-105 transition-transform duration-300">
        <img
          alt="example"
          src={product?.url ? product.url : defaultImage}
          height={200}
          width={200}
          className="group-hover:scale-125 transform origin-center"
        />
      </figure>

      <div className="card-body items-center text-center py-3">
        <h6 className="font-bold text-cyan-700 ">
          {product?.name} <br />
          <span className="text-xs text-blue-700">
            {" "}
            {product?.measurement}{" "}
          </span>{" "}
        </h6>
        <p className=" text-pink-700 text-xs font-bold ">
          Manufacturer :{product?.company}
        </p>

        <h6 className="font-bold  ">
          {product?.price} {product?.currency}
        </h6>
        <div className="flex justify-between ">
          {" "}
          <Link>
            <button
              onClick={() => handleAddToCart(product)}
              className="btn  capitalize	 btn-primary mr-4 btn-sm rounded-lg bg-sky-500"
            >
              Cart
            </button>
          </Link>
          <Link to={`/products/${product?._id}`}>
            <button className="btn  capitalize  btn-primary  btn-sm rounded-lg">
              Details
            </button>
          </Link>{" "}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
