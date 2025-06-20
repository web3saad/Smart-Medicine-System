import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import {
  useEditUserMutation,
  useSingleUserQuery,
} from "../../redux/features/user/userApi";
import Loader from "../LoaderComponent/Loader";
import { Button } from "../SharedComponents/Button";
/* eslint-disable @typescript-eslint/no-explicit-any */

type iEditUserModalType = {
  closeModal?: any;
  product?: any;
  handleEditProduct?: any;
  id?: any;
};

const EditUserModal: React.FC<iEditUserModalType> = ({ closeModal, id }) => {
  const { data, isLoading } = useSingleUserQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const singleProduct = data?.data;
  const { register, handleSubmit, setValue } = useForm();
  const [updateProduct] = useEditUserMutation();

  const onSubmit = async (data: any) => {
    const payload = {
      name: {
        firstName: data.fname,
        lastName: data.lname,
      },
      address: data.address,
      contactNo: data.contactNo,
    };
    const res = await updateProduct({ id, data: payload });
    if ("data" in res && res?.data?.statusCode) {
      toast.success("User Updated Successfully !! ");
    } else {
      toast.error("Something went wrong! Try again later !! ");
    }

    await closeModal();
  };

  useEffect(() => {
    if (singleProduct) {
      setValue("fname", singleProduct.name.firstName);
      setValue("lname", singleProduct.name.lastName);
      setValue("address", singleProduct.address);
      setValue("contactNo", singleProduct.contactNo);
    }
  }, [singleProduct, setValue]);

  return (
    <div>
      <div className="fixed inset-0 bg-gray-950 bg-opacity-75   z-20 flex items-center justify-center ">
        <div className="bg-white p-2  rounded shadow-lg w-8/12 h-3/5 py-8">
          {/* Modal Header */}
          <div className="mb-4 flex  justify-between ">
            <h2 className="text-lg font-bold">Edit User</h2>

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
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>
                    <input
                      {...register("fname")}
                      id="name"
                      className="border rounded px-3 py-2 w-full"
                      placeholder="Product Name"
                    />
                  </div>
                  <div className="mb-4 w-1/2 mr-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <input
                      {...register("lname")}
                      id="name"
                      className="border rounded px-3 py-2 w-full"
                      placeholder="Product Name"
                    />
                  </div>
                </div>

                <div className="flex justify-between mx-2">
                  <div className="mb-4 w-1/2 mr-2">
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <input
                      {...register("address")}
                      id="address"
                      type="text"
                      className="border rounded px-3 py-2 w-full"
                      placeholder="Price"
                    />
                  </div>

                  <div className="mb-4 w-1/2">
                    <label
                      htmlFor="contactNo"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Contact Number
                    </label>
                    <input
                      {...register("contactNo")}
                      id="contactNo"
                      className="border rounded px-3 py-2 w-full"
                      placeholder="contactNo"
                    />
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

export default EditUserModal;
