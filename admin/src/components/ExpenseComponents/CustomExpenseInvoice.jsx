import html2pdf from "html2pdf.js";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import logo1 from "../../../assets/images/IVTRIPLogo.png";
import Table from "../../../base-components/Table";
import LoaderComponent from "../../../components/CommonComponent/LoaderComponent/LoaderComponent";
import { useSingleExpenseBillQuery } from "../../../stores/expenseBill/expenseBillApi";

function CustomExpenseInvoice() {
  const { id } = useParams();
  const { data, isLoading } = useSingleExpenseBillQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  const billData = data?.data;

  if (isLoading) {
    return <LoaderComponent className="my-[300px]" />;
  }

  const handlePrint = () => {
    const element = document.getElementById("printableContent");
    let opt = {
      margin: 0,
      filename: `${billData?.billNo}.pdf`,
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
          <Link
            to="/bill-overview"
            className="flex text-xl text-blue-700 font-bold items-center"
          >
            <IoArrowBackCircleOutline className="text-3xl" /> Back
          </Link>
          <p className="text-xl font-bold text-green-900">
            {billData?.billNo}{" "}
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

      <div id="printableContent" className="mt-5 box">
        <div className="flex flex-col px-5 pt-10 text-center lg:flex-row sm:px-20 sm:pt-20  sm:text-left">
          <div className="text-3xl font-semibold text-primary">
            <img
              className="w-[200px] -mt-10 -ml-10"
              src={logo1}
              alt="Iv Trip"
            />
          </div>
          <div className="mt-20 lg:mt-0 lg:ml-auto lg:text-left">
            <div className="text-xl font-medium text-primary">
              <span className="capitalize">INVOICE Id: </span>
              {billData?.billNo}
            </div>
          </div>
        </div>
        <div className="flex flex-col px-5 lg:flex-row sm:px-20 ">
          <div>
            <div className="text-base text-slate-500">To</div>
            <div className="mt-2 text-md text-primary">
              <span className="font-medium">Client Name: </span>{" "}
              {billData?.billTo}
            </div>
            <div className="mt-1 ">
              <span className="font-medium">Created By: </span>
              {billData?.createdBy}
            </div>
            <div className="mt-1">
              {" "}
              <span className="font-medium">Bill date: </span>{" "}
              {billData?.billDate}
            </div>
            <div className="mt-1">
              {" "}
              <span className="font-medium">Bill date: </span>{" "}
              {billData?.dueBillDate}
            </div>
            <div className="mt-1">
              {" "}
              <span className="font-medium">Address: </span>260 W. Storm Street
              New York, NY 10025.
            </div>
          </div>
          <div className="mt-10 lg:text-left lg:mt-0 lg:ml-auto">
            <div className="text-base text-slate-500">Bill Details</div>
            <div className="mt-2 text-md  text-primary">
              <span className="font-medium">Payment Status : </span>
              {billData?.paymentStatus}
            </div>
            <div className="mt-2 text-md  text-primary">
              <span className="font-medium">Payment By : </span>
              {billData?.paymentBy}
            </div>

            <div className="mt-1">8023 Amerige Street Harriman, NY 10926.</div>
          </div>
        </div>
        <div className="px-5 py-10 sm:px-16 sm:py-20">
          <div className="overflow-x-auto">
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th className="border-b-2 dark:border-darkmode-400 whitespace-wrap text-[12px]">
                    SL
                  </Table.Th>

                  <Table.Th className="text-left border-b-2 dark:border-darkmode-400 whitespace-wrap text-[12px]">
                    Bill Description
                  </Table.Th>
                  <Table.Th className="border-b-2 dark:border-darkmode-400 whitespace-wrap text-[12px]">
                    Bill Category
                  </Table.Th>
                  <Table.Th className="text-left border-b-2 dark:border-darkmode-400 whitespace-wrap text-[12px]">
                    Amount
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {billData?.billInfo?.map((item, i) => (
                  <Table.Tr>
                    <Table.Td className="border-b dark:border-darkmode-400">
                      <div className="font-medium whitespace-wrap text-[12px]">
                        {i + 1}
                      </div>
                    </Table.Td>
                    <Table.Td
                      colSpan={1}
                      className="w-32 text-center border-b dark:border-darkmode-400 text-[12px] whitespace-wrap"
                    >
                      {item?.itemDescription}
                    </Table.Td>
                    <Table.Td className="border-b dark:border-darkmode-400">
                      <div className="font-medium whitespace-wrap w-fit text-[12px] px-1">
                        {item?.billCategory}
                      </div>
                    </Table.Td>

                    <Table.Td
                      colSpan={1}
                      className="w-32 border-b text-center dark:border-darkmode-400 text-[12px] whitespace-wrap"
                    >
                      {item?.amount} INR
                    </Table.Td>
                  </Table.Tr>
                ))}

                <Table.Tr className="">
                  <Table.Td
                    colSpan={7}
                    className=" text-base  font-medium  !pt-6 border-transparent dark:!border-transparent text-right w-32  whitespace-wrap pl-2 "
                  >
                    TOTAL AMOUNT
                  </Table.Td>
                  <Table.Td className="!pt-6 border-transparent dark:!border-transparent text-left w-32 text-[12px] whitespace-wrap text-base  font-medium ">
                    {billData?.originalAmount.toLocaleString()} INR
                  </Table.Td>
                </Table.Tr>

                <Table.Tr className="py-0">
                  <Table.Td
                    colSpan={7}
                    className="border-transparent text-right w-32 text-[12px] whitespace-wrap py-0 text-base  font-medium "
                  >
                    DISCOUNT
                  </Table.Td>
                  <Table.Td className="border-transparent text-left w-32 text-[12px] whitespace-wrap py-0 text-base  font-medium ">
                    {billData?.discount} %
                  </Table.Td>
                </Table.Tr>

                <Table.Tr className="">
                  <Table.Td
                    colSpan={7}
                    className=" text-base  font-medium  !pt-6 border-transparent dark:!border-transparent text-right w-32  whitespace-wrap pl-2 "
                  >
                    NET TOTAL
                  </Table.Td>
                  <Table.Td className="!pt-6 border-transparent dark:!border-transparent text-left w-32 text-[12px] whitespace-wrap text-base  font-medium ">
                    {billData?.netTotal.toLocaleString()} INR
                  </Table.Td>
                </Table.Tr>

                <Table.Tr className="py-0">
                  <Table.Td
                    colSpan={7}
                    className=" border-transparent text-right w-32 text-[12px] whitespace-wrap pl-2 py-0 text-base  font-medium "
                  >
                    PAID AMOUNT
                  </Table.Td>
                  <Table.Td className=" border-transparent text-left w-36 text-base  font-medium whitespace-wrap">
                    {billData?.paidAmount.toLocaleString()} INR
                  </Table.Td>
                </Table.Tr>
                <Table.Tr className="py-0">
                  <Table.Td
                    colSpan={7}
                    className=" border-transparent text-right w-32 text-[12px] whitespace-wrap pl-2 py-0 text-base  font-medium "
                  >
                    DUE AMOUNT
                  </Table.Td>
                  <Table.Td className=" border-transparent text-left w-36 text-base  font-medium whitespace-wrap">
                    {billData?.dueAmount.toLocaleString()} INR
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </div>
        </div>
        {/* <div className="pt-8 pb-16 mx-5 border-t sm:mx-16 border-slate-200/60 text-center">
          Thanks for buying from{" "}
          <a href="" className="text-primary">
            {siteSettings?.title}
          </a>{" "}
        </div> */}
      </div>
    </div>
  );
}

export default CustomExpenseInvoice;
