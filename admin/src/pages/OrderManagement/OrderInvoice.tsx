/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import html2pdf from "html2pdf.js";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import cod from "../../assets/cod.png";
import logo from "../../assets/logo.png";
import paid from "../../assets/paid.png";
import Loader from "../../components/LoaderComponent/Loader";
import { useSingleOrderQuery } from "../../redux/features/order/orderApi";

function OrderInvoice() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
      return;
    }

    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate("/");
  };

  let billCount = 1;
  const { id } = useParams();

  const { data, isLoading } = useSingleOrderQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  const orderData = data?.data;
  const userData = orderData?.userId;

  if (isLoading) {
    return <Loader />;
  }

  const handlePrint = () => {
    const element = document.getElementById("printableContent");
    const opt = {
      margin: 0,
      filename: `${orderData?.orderId}.pdf`,
      image: { type: "pdf", quality: 0.2 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "p" },
      timeout: 120000,
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="px-5">
      <div className="mx-5   flex justify-between">
        <div>
          <button
            onClick={handleBack}
            className="flex text-xl text-blue-700 font-bold items-center"
          >
            <IoArrowBackCircleOutline className="text-3xl" /> Back
          </button>
          <p className="text-xl font-bold text-green-900">
            #{orderData?.orderId}{" "}
          </p>
        </div>

        <div className="mb-4">
          <button
            className="bg-blue-900 py-3 px-8 ml-5 mt-2 text-white rounded-lg font-bold text-base"
            type="submit"
            onClick={handlePrint}
          >
            Download Invoice
          </button>
        </div>
      </div>
      <div className="border-b-2 border-blue-700"></div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div id="printableContent" className="mt-5 box">
            <div className="flex justify-between px-5 pt-10 text-center lg:flex-row sm:px-20 sm:pt-20  sm:text-left">
              <div className="text-3xl font-semibold text-primary">
                <img className="w-48 -mt-20 -ml-12" src={logo} alt="Med-Shop" />
              </div>

              <div className="text-3xl font-semibold text-primary">
                <div className="text-base -mt-20 font-medium text-primary">
                  <span className="capitalize">INVOICE Id: </span>#
                  {orderData?.orderId}
                </div>
              </div>
            </div>

            <div className="flex justify-between px-10 text-base  py-2">
              <div>
                <p className="font-semibold ">Customer Info</p>
                <div className="border-b-2 mt-2 border-yellow-500 w-3/5"></div>
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
                <div className="border-b-2 mt-2 border-yellow-500"></div>
                <p>
                  Order No # <Hlt> {orderData?.orderId} </Hlt>
                </p>
                <p>
                  Order Date & Time :<Hlt> {orderData.orderDate} </Hlt>
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
                        <th className="border border-gray-200 px-4 py-2">
                          Name
                        </th>
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

            <div className="text-3xl font-semibold text-primary">
              <img
                className="w-48 ml-20 mt-"
                src={orderData.paymentStatus === "pending" ? cod : paid}
                alt="Payment Status"
              />
            </div>

            <div className="pt-8 pb-16 mx-5 border-t sm:mx-16 border-slate-200/60 text-center">
              <p>
                If you have any questions about this policy or your interaction
                with our site, please feel free to contact us.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default OrderInvoice;

export const Hlt = ({ children }: any) => (
  <span className="font-semibold text-cyan-800">{children}</span>
);
