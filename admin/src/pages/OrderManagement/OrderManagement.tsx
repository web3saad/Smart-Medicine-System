/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import Loader from "../../components/LoaderComponent/Loader";
import Headline from "../../components/SharedComponents/Headline";
import { useGetAllOrderForAdminQuery } from "../../redux/features/order/orderApi";
interface ProductProps {
  id?: string;
  _id?: string;
  productDescription?: string;
  name?: string;
  price?: string;
}

const OrderManagement: React.FC<ProductProps> = () => {
  const { data, isLoading } = useGetAllOrderForAdminQuery("");

  let count = 1;
  const rows = data?.map((u: any) => ({
    id: count++,
    _id: u?._id,
    orderId: u?.orderId,
    orderDate: u?.orderDate,
    delivaryStatus: (
      <p
        className={`font-bold text-lg mt-6 ${
          u?.delivaryStatus === "pending"
            ? "text-yellow-500"
            : u?.delivaryStatus === "delivered"
            ? "text-green-600"
            : u?.delivaryStatus === "cancelled"
            ? "text-red-600"
            : ""
        }`}
      >
        {u?.delivaryStatus}
      </p>
    ),
    paymentStatus: (
      <p
        className={`font-bold text-lg mt-6 ${
          u?.paymentStatus === "pending"
            ? "text-yellow-500"
            : u?.paymentStatus === "paid"
            ? "text-green-600"
            : u?.paymentStatus === "cod"
            ? "text-cyan-600"
            : ""
        }`}
      >
        {u?.paymentStatus}
      </p>
    ),

    contactNo: u?.contactNumber,
    total: u?.total.toFixed(2),
    address: u?.shippingAddress,
    items: u?.orderedItems.map((item: any) => item.name).join(", "),
  }));

  const CenteredCellRenderer = (params: any) => (
    <div style={{ textAlign: "center" }}>{params.value}</div>
  );
  const CenteredCellLinkRenderer = (params: any) => (
    <Link
      to={`/order-management/${params?.row?.orderId}`}
      className="text-base text-blue-500 hover:font-semibold hover:underline"
      style={{ textAlign: "center" }}
    >
      {params.value}
    </Link>
  );

  const columns: GridColDef<(typeof data)[number]>[] = [
    {
      field: "orderId",
      headerAlign: "center",
      headerName: "Order Id",
      width: 155,
      renderCell: CenteredCellLinkRenderer,
    },
    {
      field: "contactNo",
      headerAlign: "center",
      headerName: "Phone",
      type: "number",
      width: 150,
      renderCell: CenteredCellRenderer,
    },
    {
      field: "paymentStatus",
      headerAlign: "center",
      headerName: "Payment Status",
      type: "number",
      width: 120,
      renderCell: CenteredCellRenderer,
    },
    {
      field: "delivaryStatus",
      headerAlign: "center",
      headerName: "Delivary Status",
      type: "number",
      width: 130,
      renderCell: CenteredCellRenderer,
    },
    {
      field: "total",
      headerAlign: "center",
      headerName: "Total",
      type: "number",
      width: 130,
      renderCell: CenteredCellRenderer,
    },
    {
      field: "address",
      headerAlign: "center",
      headerName: "Address",
      type: "number",
      width: 150,
      renderCell: CenteredCellRenderer,
    },
  ];

  return (
    <div className="container mx-auto">
      <div className="flex justify-between">
        <Headline>All Orders </Headline>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <Box sx={{ height: 500, width: "100%" }}>
          <DataGrid
            {...data}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            className="mx-5 mt-5 bg-gray-50 rounded-lg"
            rowHeight={90}
            rows={rows}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 20,
                },
              },
            }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
            pageSizeOptions={[1]}
            disableRowSelectionOnClick
          />
        </Box>
      )}
    </div>
  );
};

export default OrderManagement;
