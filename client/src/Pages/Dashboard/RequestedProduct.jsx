import { toast } from "react-hot-toast";
import {
  useDeleteRequestedProductMutation,
  useGetRequestedProductQuery,
} from "../../redux/features/user/userApi";
import LoadingSpinner from "../Shared/LoadingSpinner";

const RequestedProduct = () => {
  const storedId = localStorage.getItem("_id");

  const { data, isLoading } = useGetRequestedProductQuery(storedId, {
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
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Product Description</th>
              <th>Quantity</th>
              <th>Request Status</th>
              <th>Request Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={user?.id}>
                <th>{index + 1}</th>
                <td className="font-bold text-cyan-700">
                  {user?.productDescription}
                </td>
                <td>{user?.quantity}</td>
                <td className=" font-bold text-red-500">{user?.status}</td>
                <td className=" font-bold text-xs text-teal-700 ">
                  {user?.requestedTime}
                </td>
                <th>
                  <button
                    onClick={() => handleRequestedProductDelete(user?._id)}
                    className="btn bg-sky-800 hover:bg-sky-800 text-white capitalize btn-xs rounded-lg"
                  >
                    delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestedProduct;
