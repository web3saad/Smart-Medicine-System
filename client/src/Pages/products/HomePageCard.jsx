/* eslint-disable react/prop-types */
import { toast } from "react-hot-toast";
import defaultImage from "../../assets/coursephoto/p1.jpg";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { useAppDispatch } from "../../redux/hook";
const HomePageCard = ({ product }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = async (course) => {
    dispatch(addToCart(course));
    toast.success("Product Added to Cart Successfully!");
  };

  return (
    <div className="card w-64 h-72 p-1 border-solid border-2  border-sky-950 hover:shadow-lg">
      <figure className=" pt-2">
        <img
          className="p-5"
          alt="example"
          src={product?.url || defaultImage}
          height={275}
          width={250}
        />
      </figure>
      <div className="card-body items-center text-center py-3">
        <h6 className="font-bold text-cyan-950  capitalize">
          {product?.name}{" "}
          <span className="text-xs text-gray-400 lowercase">
            {product?.measurement}
          </span>
        </h6>

        <p className="text-normal text-sm text-cyan-750">{product?.company}</p>

        <h6 className="font-bold  "> ₹ {product?.price} </h6>
        <button
          onClick={() => handleAddToCart(product)}
          className="btn capitalize bg-sky-800 hover:bg-sky-800  btn-sm mx-2 text-white rounded-lg"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default HomePageCard;
