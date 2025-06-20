import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { useSingleOrderQuery, useUpdateOrderMutation } from "../../redux/features/order/orderApi";
import Loader from "../LoaderComponent/Loader";
import { Button } from "../SharedComponents/Button";

type iEditProductModalType = {
  closeModal?: any;
  product?: any;
  handleEditProduct?: any;
  id?: any;
};

const OrderStatusModal: React.FC<iEditProductModalType> = ({
  closeModal,
  id,
}) => {
  const { data, isLoading } = useSingleOrderQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const orderData = data?.data;
  const { register, handleSubmit, setValue } = useForm();
  const [updateOrder] = useUpdateOrderMutation();

  const onSubmit = async (data: any) => {
    const res = await updateOrder({ id, data });
    if ("data" in res && res?.data?.statusCode) {
      toast.success("Order Status Updated Successfully !! ");
    } else {
      toast.error("Something went wrong! Try again later !! ");
    }

    await closeModal();
  };

  useEffect(() => {
    if (orderData) {
      setValue("delivaryStatus", orderData.delivaryStatus);
      setValue("paymentStatus", orderData.paymentStatus);
    }
  }, [orderData, setValue]);

  return (
    <div>
      <div className="fixed inset-0 bg-gray-950 bg-opacity-75   z-20 flex items-center justify-center ">
        <div className="bg-white   rounded shadow-lg w-8/12 h-4/5">
          {/* Modal Header */}
          <div className="mb-4 flex p-2 text-white  bg-cyan-700 justify-between ">
            <h2 className="text-lg font-bold">Change Order Status</h2>

            <IoMdClose
              className="text-2xl cursor-pointer bg-cyan-200  text-red-400 "
              onClick={closeModal}
            />
          </div>

          {/* Modal Body */}
          {isLoading ? (
            <Loader />
          ) : (
            <div className="h-full overflow-y-auto">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-between mx-2">
                  <div className="mb-4 w-1/2 mr-2">
                    <p className="text-lg font-bold text-blue-700">
                      {" "}
                      Order Id : {orderData.orderId}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between mx-2">
                  <div className="mb-4 w-1/2 mr-2">
                    <label
                      htmlFor="status"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Payment Status
                    </label>
                    <select
                      {...register("paymentStatus")}
                      id="paymentStatus"
                      className="border rounded-md px-3 py-2 w-full"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select status
                      </option>

                      <option value="cod">Cash On Delivery</option>
                      <option value="paid">Paid</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>

                  <div className="mb-4 w-1/2 mr-2">
                    <label
                      htmlFor="status"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Delivary Status
                    </label>
                    <select
                      {...register("delivaryStatus")}
                      id="delivaryStatus"
                      className="border rounded-md px-3 py-2 w-full"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select status
                      </option>
                      <option value="pending">Pending</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end mt-4 mr-2">
                  <Button>Save</Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderStatusModal;
