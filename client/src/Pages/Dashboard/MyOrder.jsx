/* eslint-disable no-unused-vars */
import { toast } from "react-hot-toast";
import { useGetAllOrderQuery } from "../../redux/features/cart/cartApi";
import { useDeleteRequestedProductMutation } from "../../redux/features/user/userApi";
import LoadingSpinner from "../Shared/LoadingSpinner";

const MyOrder = () => {
  const storedId = localStorage.getItem("_id");

  const { data, isLoading } = useGetAllOrderQuery(storedId, {
    refetchOnMountOrArgChange: true,
  });

  const [requestedProductDelete] = useDeleteRequestedProductMutation();
  const users = data?.data;

  const handleRequestedProductDelete = async (id) => {
    await requestedProductDelete(id).unwrap();
    toast.success("Requested Product is removed!!");
  };
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table bg-white rounded-lg">
          {/* head */}
          <thead>
            <tr className="font-bold text-sm text-cyan-700">
              <th></th>
              <th>Product Description</th>
              <th>Total </th>
              <th>Payment Status</th>
              <th>Delivery Status</th>
              <th>Order Date</th>
            </tr>
          </thead>
          <tbody className="">
            {users?.map((user, index) => (
              <tr key={user?.id} className="border border-sky-950">
                <th>{index + 1}</th>
                <td className="font-bold text-cyan-700 ">
                  {user?.orderedItems.map((item, index) => (
                    <div key={index}>
                      {" "}
                      <ul className="list-disc">
                        {" "}
                        <li>
                          {" "}
                          {item.name}{" "}
                          <span className="text-xs text-pink-800">
                            {item.measurement}
                            <br />
                            Quantity:{item.quantity}
                          </span>
                        </li>
                      </ul>
                    </div>
                  ))}
                </td>

                <td className=" font-bold text-sky-700">
                  {" "}
                  {user?.total.toFixed(2)} tk
                </td>
                {/* Status */}
                <td className=" font-bold text-red-500">
                  {user?.paymentStatus}
                </td>
                <td className=" font-bold text-red-500">
                  {user?.delivaryStatus}
                </td>

                <td className=" font-bold text-xs text-teal-700">
                  {user?.orderDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrder;
