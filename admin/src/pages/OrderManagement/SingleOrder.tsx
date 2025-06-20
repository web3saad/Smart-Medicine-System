import { useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/LoaderComponent/Loader";
import OrderStatusModal from "../../components/OrderComponents/OrderStatusModal";
import { useSingleOrderQuery } from "../../redux/features/order/orderApi";

const SingleOrder = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  let billCount = 1;
  const { id } = useParams();
  const { data, isLoading } = useSingleOrderQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const orderData = data?.data;
  const userData = orderData?.userId;
  const handlePrint = () => {
    navigate(`/order-invoice/${orderData.orderId}`);
  };
  const handleChangeStatus = () => {
    setIsModalOpen(true);
  };
  const closeModal = async () => {
    setIsModalOpen(false);
  };
  return (
    <div className="  mb-20">
      {isModalOpen && (
        <>
          <OrderStatusModal closeModal={closeModal} id={id} />
        </>
      )}

      <div className="mx-5   flex justify-between">
        <div>
          <Link
            to="/order-management"
            className="flex text-xl text-blue-400 font-bold items-center"
          >
            <IoArrowBackCircleOutline className="text-3xl" /> Back
          </Link>
          <p className="text-xl font-bold text-green-900">
            #{orderData?.orderId}{" "}
          </p>
        </div>

        <div className="mb-4">
          <button
            className="bg-transparent py-2.5 mr-2 px-8 ml-2 mt-2 text-blue-600 rounded-sm font-bold text-base  border-2 border-blue-700"
            type="submit"
            onClick={handlePrint}
          >
            Print
          </button>

          <button
            className="bg-blue-950 py-3 px-8 text-white mt-2 rounded-sm font-bold text-base"
            type="submit"
            onClick={handleChangeStatus}
          >
            Change Status
          </button>
        </div>
      </div>
      <div className="border-b-2 border-blue-400"></div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-between px-10 text-base  py-2">
            <div>
              <p className="font-semibold ">Customer Info</p>
              <div className="border-b-2 mt-0.5 border-yellow-500 w-3/5"></div>
              <p>
                Name:
                <Hlt>
                  {" "}
                  {userData.name?.firstName} {userData.name?.lastName}{" "}
                </Hlt>
              </p>
              <p>
                Phone Number :<Hlt> {userData.contactNo}</Hlt>
              </p>
              <p>
                Email : <Hlt>{userData.email} </Hlt>
              </p>
              <p>
                Address: <Hlt>{userData.address}</Hlt>
              </p>
            </div>

            <div>
              <p className=" font-semibold ">Order Details</p>
              <div className="border-b-2 mt-0.5 border-yellow-500"></div>
              <p>
                Order No # <Hlt> {orderData?.orderId} </Hlt>
              </p>
              <p>
                Order Date & Time :<Hlt> {orderData.orderDate} </Hlt>
              </p>
              <p>
                Payment Status : <Hlt> {orderData?.paymentStatus}</Hlt>
              </p>
              <p>
                Delivary Status : <Hlt>{orderData?.delivaryStatus}</Hlt>
              </p>
            </div>
          </div>

          <div className="px-5 py-5">
            <div className="w-full mx-auto">
              <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border  ">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-2">ID</th>
                      <th className="border border-gray-200 px-4 py-2">Name</th>
                      <th className="border border-gray-200 px-4 py-2">
                        Generic
                      </th>
                      <th className="border border-gray-200 px-4 py-2">
                        Measurement
                      </th>

                      <th className="border border-gray-200 px-4 py-2">
                        Quantity
                      </th>
                      <th className="border border-gray-200 px-4 py-2">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderData?.orderedItems?.map((p: any, index: any) => (
                      <tr key={index} className="text-center">
                        <td className="border border-gray-200 px-4 py-2">
                          {billCount++}
                        </td>
                        <td className="border border-gray-200  px-4 py-2">
                          {p?.name}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {p?.generic}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {p?.measurement}
                        </td>

                        <td className="border border-gray-200 px-4 py-2">
                          {p?.quantity}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {p?.price?.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="flex mx-5 justify-end mt-5  ">
            <div className="text-xl mr-5 mt-2 lg:w-2/5 ">
              <div className="border-b-2 mt-0.5 border-blue-400"></div>
              <p className=" flex justify-between">
                <p> Total Amount :</p>
                <p className="text-2xl font-bold">
                  {orderData?.total?.toFixed(2)} INR
                </p>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleOrder;

export const Hlt = ({ children }: any) => (
  <span className="font-semibold text-cyan-800">{children}</span>
);
