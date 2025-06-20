/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import Loader from "../../components/LoaderComponent/Loader";
import CreateProductModal from "../../components/ProductComponents/CreateProduct";
import EditProductModal from "../../components/ProductComponents/EditProductModal";
import { Button } from "../../components/SharedComponents/Button";
import Headline from "../../components/SharedComponents/Headline";
import { useGetProductsQuery } from "../../redux/features/product/productApi";

const Product: React.FC<any> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [id, setId] = useState(null);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
    searchText: searchText,
  });
  const { data, isLoading } = useGetProductsQuery(paginationModel);
  const handleSearch = () => {
    setPaginationModel((prevModel) => ({
      ...prevModel,
      searchText,
    }));
  };

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

  const handleDeleteProduct = (id: any) => {
    alert(id);
  };
  const rows = data?.data?.map((product: any) => ({
    id: product?._id,  // Use _id as unique id for DataGrid
    _id: product?._id,
    Name: product?.name,
    Description: product?.productDescription,
    Price: product?.price,
    Stock: product?.stock,
    Image: product?.image, // add image field
  }));

  const CenteredCellRenderer = (params: any) => (
    <div style={{ textAlign: "center" }}>{params.value}</div>
  );

  const ImageCellRenderer = (params: any) => {
    const imageUrl = params.value
      ? `http://localhost:5001/uploads/products/${params.value}`
      : '/path/to/default/p1.jpg'; // fallback to default image
    return (
      <img
        src={imageUrl}
        alt="Product"
        style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
      />
    );
  };

  const columns: any = [
    { field: "id", headerName: "ID", headerAlign: "center", width: 80 },
    {
      field: "Image",
      headerAlign: "center",
      headerName: "Image",
      width: 100,
      renderCell: ImageCellRenderer,
      sortable: false,
      filterable: false,
    },
    {
      field: "Name",
      headerAlign: "center",
      headerName: "Name",
      width: 200,
      renderCell: CenteredCellRenderer,
    },
    {
      field: "Description",
      headerAlign: "center",
      headerName: "Description",
      width: 250,
      renderCell: CenteredCellRenderer,
    },
    {
      field: "Price",
      headerAlign: "center",
      headerName: "Price",
      type: "number",
      width: 100,
      renderCell: CenteredCellRenderer,
    },
    {
      field: "Stock",
      headerAlign: "center",
      headerName: "Stock",
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
      renderCell: (params: any) => (
        <strong className="flex justify-center">
          <Button
            className="bg-blue-700 hover:bg-cyan-700 h-10  mt-5"
            onClick={() => openEditModal(params.row._id)}
          >
            <p className="-mt-5">Edit</p>
          </Button>
          <Button
            className="bg-red-700 ml-5 h-10  mt-5"
            onClick={() => handleDeleteProduct(params.row._id)}
          >
            <p className="-mt-5">Delete</p>
          </Button>
        </strong>
      ),
    },
  ];

  return (
    <div className="container mx-auto">
      <div className="flex justify-between">
        <Headline>All Products</Headline>
        <div className="flex justify-end h-12 lg:mt-5 lg:mr-36">
          <Button className="bg-cyan-700" onClick={() => openAddProductModal()}>
            Add New Product
          </Button>
        </div>
      </div>

      {isOpen && (
        <>
          <EditProductModal closeModal={closeModal} id={id} />
        </>
      )}
      {isAddProductModalOpen && (
        <>
          <CreateProductModal closeModal={closeModal} />
        </>
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <Box sx={{ height: 500, width: "100%" }}>
          <p className="flex justify-start items-center mt-5">
           
            <Box
              component="form"
              className="px-5 flex items-center"
              sx={{
                "& > :not(style)": { width: "55ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                onChange={(e: any) => {
                  setSearchText(e.target.value);
                }}
                color="success"
                id="filled-basic"
                label="Search Product by Name,Descripton,Company Name "
                variant="filled"
              />
            </Box>

            <Button
              onClick={() => handleSearch()}
              className="bg-gray-700 h-10"
            >
              Search
            </Button>
          </p>

          <DataGrid
            {...data}
            rowCount={252}
            disableColumnFilter
            disableColumnSelector
            loading={isLoading}
            disableDensitySelector
            className="mx-5 mt-5 bg-gray-50 rounded-lg"
            rowHeight={70}
            paginationMode="server"
            rows={rows}
            pageSizeOptions={[10]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            columns={columns}
          />
        </Box>
      )}

      {/* <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          {...data}
          rowCount={rowCount}
          loading={isLoading}
          pageSizeOptions={[5]}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
        />
      </Box> */}
    </div>
  );
};

export default Product;
