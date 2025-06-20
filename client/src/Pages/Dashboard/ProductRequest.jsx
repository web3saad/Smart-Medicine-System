/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { usePostProductRequestMutation } from "../../redux/features/user/userApi";
import { toast } from "react-hot-toast";
import { Swal } from "sweetalert2";

const ProductRequest = () => {
  const [postProductRequest] = usePostProductRequestMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const _id = localStorage.getItem("_id");
  const onSubmit = async (data) => {
    const options = {
      data: {
        quantity: data.quantity,
        productDescription: data.productDescription,
        requestedId: _id,
      },
    };
    try {
      const result = await postProductRequest(options).unwrap();
      const { statusCode, status } = result;
      if (statusCode === 200) {
        toast.success("Product is Requested SuccessFully");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Product is Requested  SuccessFully",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      }
      if (status === 409) {
        toast.error("This Book is Already Exist");
      }
    } catch (error) {
      if (error.status === 409) {
        toast.error("This Book is Already Exist");
      }
    }

    reset();
  };

  return (
    <div className=" items-center justify-center h-screen ">
      <div className="border-dashed border-2 border-sky-500 p-3 text-center">
        <p className="text-xl font-bold text-pink-800">Product Request</p>
        <p className="text-sm font-semibold text-teal-700">
          Can not find a product you want in our inventory? Let us know what you
          are looking for and we will try our best to bring it in.
        </p>
        <div className=" flex justify-center ">
          <form
            className="form-control w-1/2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <textarea
              placeholder="Product Description"
              className="textarea textarea-bordered rounded-lg  my-2 textarea-lg w-full  max-w-xs"
              {...register("productDescription", { required: true })}
            ></textarea>

            {errors.productDescription?.type === "required" && (
              <small className="text-red-600">
                Product Description is required!
              </small>
            )}

            <input
              type="number"
              placeholder="Quantity"
              className="input my-2  rounded-lg  w-full max-w-xs"
              {...register("quantity", { required: true, min: 1 })}
            />
            {errors.quantity && (
              <small className="text-red-600">
                Quantity must be at least 1
              </small>
            )}

            <button
              type="submit"
              className="btn w-48 rounded-lg capitalize btn-primary mt-2"
            >
              Product Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductRequest;
