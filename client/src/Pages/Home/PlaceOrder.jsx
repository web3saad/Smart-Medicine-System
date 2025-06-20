/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import PlaceOrderComponent from "../../Components/PlaceOrder/PlaceOrderComponent";
import { useCreateOrderMutation } from "../../redux/features/cart/cartApi";
import { clearCart } from "../../redux/features/cart/cartSlice";
import { useSingleUserQuery } from "../../redux/features/user/userApi";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import NavBar from "../Shared/NavBar";

const PlaceOrder = () => {
  const storedId = localStorage.getItem("_id");
  const [createOrder] = useCreateOrderMutation();
  const { data, isLoading } = useSingleUserQuery(storedId, {
    refetchOnMountOrArgChange: true,
  });
  const user = data?.data;

  const { book, total } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const cartData = book;

  const total1 = total?.toFixed(0);

  const navigate = useNavigate();
  const handleOrder = async () => {
    const options = {
      data: {
        shippingAddress: user?.address,
        contactNumber: user?.contactNo,
        userId: storedId,
        total: total1,
        orderedItems: cartData,
      },
    };
    const result = await createOrder(options).unwrap();
    if (result.statusCode === 200) {
      toast.success("Order Placed successfully");
      dispatch(clearCart());
      navigate("/order-confirmed");
    }
  };

  return (
    <>
      <NavBar />
      <div className="py-20 px-20 flex flex-col">
        <div className="my-5">
          <p className="font-bold text-cyan-800 ">
            Shipping Address: {user?.address}
          </p>
          <p className=" font-bold text-pink-700 ">
            Contact Number: {user?.contactNo}
          </p>
          <h1 className="font-bold text-cyan-700">
            Total : {total?.toFixed(2)} tk
          </h1>

          {cartData.length < 1 ? (
            <>
              <h1 className="text-xl mt-2 text-blue-800 font-bold">
                Your Cart is Empty!! 😓{" "}
              </h1>
              <button className="btn text-white mt-5 btn-info btn-sm capitalize">
                <Link to="/products/category"> Start Shopping 💜</Link>
              </button>
            </>
          ) : (
            <button
              className="btn mt-5 btn-accent btn-sm capitalize rounded-lg p-2"
              onClick={handleOrder}
            >
              Place Order
            </button>
          )}
        </div>

        <div className="menu fixed top-0 left-100 right-0 bg-base-300 p-4 w-96 h-full  text-base-content px-10">
          <ul className="cart-slider-list">
            <PlaceOrderComponent />
          </ul>
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
