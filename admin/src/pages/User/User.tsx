/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useState } from "react";
import Loader from "../../components/LoaderComponent/Loader";
import Headline from "../../components/SharedComponents/Headline";
import CreateUserModal from "../../components/UserComponents/CreateUserModal";
import EditUserModal from "../../components/UserComponents/EditUserModal";
import { useGetUsersQuery } from "../../redux/features/user/userApi";
interface ProductProps {
  id?: string;
  _id?: string;
  productDescription?: string;
  name?: string;
  price?: string;
}

const User: React.FC<ProductProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [id, setId] = useState(null);
  const { data, isLoading } = useGetUsersQuery("");
  const closeModal = async () => {
    setIsOpen(false);
    setIsAddProductModalOpen(false);
  };

  const openEditModal = async (id: any) => {
    setIsOpen(true);
    setId(id);
  };
  const openAddProductModal = async () => {
    setIsAddProductModalOpen(true);
  };
  let count = 1;
  const rows = data?.map((u: any) => ({
    id: count++,
    _id: u?._id,
    Name: u?.name.firstName + " " + u?.name.lastName,
    address: u?.address,
    role: u?.role,
    contactNo: u?.contactNo,
  }));

  const CenteredCellRenderer = (params: any) => (
    <div style={{ textAlign: "center" }}>{params.value}</div>
  );

  const columns: GridColDef<(typeof data)[number]>[] = [
    {
      field: "Name",
      headerAlign: "center",
      headerName: "Name",
      width: 200,
      renderCell: CenteredCellRenderer,
    },
    {
      field: "address",
      headerAlign: "center",
      headerName: "Address",
      width: 250,
      renderCell: CenteredCellRenderer,
    },
    {
      field: "contactNo",
      headerAlign: "center",
      headerName: "contactNo",
      type: "number",
      width: 150,
      renderCell: CenteredCellRenderer,
    },
    {
      field: "role",
      headerAlign: "center",
      headerName: "Role",
      type: "number",
      width: 100,
      renderCell: CenteredCellRenderer,
    },
    {
      field: "Action",
      headerAlign: "center",
      headerName: "Action",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <strong className=" flex  justify-center mt-5 ">
          <Button
            variant="contained"
            size="small"
            style={{ marginLeft: 16 }}
            tabIndex={params.hasFocus ? 0 : -1}
            onClick={() => openEditModal(params.row._id)}
          >
            Edit
          </Button>
        </strong>
      ),
    },
  ];

  return (
    <div className="container mx-auto">
      <div className="flex justify-between">
        <Headline>All User List</Headline>
        <div className="flex justify-end h-12 lg:mt-5 lg:mr-36">
          <Button variant="contained" onClick={() => openAddProductModal()}>
            Add New User
          </Button>
        </div>
      </div>

      {isOpen && (
        <>
          <EditUserModal closeModal={closeModal} id={id} />
        </>
      )}
      {isAddProductModalOpen && (
        <>
          <CreateUserModal closeModal={closeModal} />
        </>
      )}
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
            rowHeight={70}
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

export default User;
