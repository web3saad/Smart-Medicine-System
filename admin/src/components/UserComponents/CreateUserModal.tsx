/* eslint-disable @typescript-eslint/no-explicit-any */

import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { useCreateProductMutation } from "../../redux/features/product/productApi";
import { Button } from "../SharedComponents/Button";

type ICreateUserModalType = {
  closeModal?: any;
  product?: any;
  handleEditProduct?: any;
  id?: any;
};

const CreateUserModal: React.FC<ICreateUserModalType> = ({ closeModal }) => {
  const { register, handleSubmit } = useForm();
  const [createProduct] = useCreateProductMutation();

  const onSubmit = async (data: any) => {
    try {
      const res: any = await createProduct({ data });

      if (res?.data?.statusCode === 200) {
        toast.success("Product Created Successfully !");
      } else if (res?.error?.status === 409) {
        toast.error("This Product is already Exist");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
      closeModal();
    }
  };

  return (
    <div>
      <div className="fixed inset-0 bg-gray-950 bg-opacity-75  z-20 flex items-center justify-center">
        <div className="bg-white p-2  rounded shadow-lg w-8/12 h-/5">
          {/* Modal Header */}
          <div className="mb-4 flex   justify-between ">
            <h2 className="text-lg font-bold">Create a User</h2>

            <IoMdClose
              className="text-2xl  hover:scale-150 cursor-pointer bg-cyan-200  text-red-400 "
              onClick={closeModal}
            />
          </div>

          {/* Modal Body */}

          <div className="h-full overflow-y-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex justify-between mx-2">
                <div className="mb-4 w-1/2 mr-2">
                  <label
                    htmlFor="name"
                    className="block text-sm  font-medium text-gray-700"
                  >
                    Product Name
                  </label>
                  <input
                    {...register("name")}
                    id="name"
                    className="border border-blue-400 rounded px-3 py-2 w-full"
                    placeholder="Product Name"
                  />
                </div>
                <div className="mb-4 w-1/2">
                  <label
                    htmlFor="generic"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Generic
                  </label>
                  <input
                    {...register("generic")}
                    id="generic"
                    className="border  border-blue-400 rounded px-3 py-2 w-full"
                    placeholder="Generic"
                  />
                </div>
                <div className="mb-4 ml-2 w-1/2">
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Company
                  </label>
                  <input
                    {...register("company")}
                    id="company"
                    className="border  border-blue-400 rounded px-3 py-2 w-full"
                    placeholder="Menufecturar"
                  />
                </div>
              </div>

              {/* Price & Country */}
              <div className="flex justify-between mx-2">
                <div className="mb-4 w-1/2 mr-2">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Price
                  </label>
                  <input
                    {...register("price")}
                    id="price"
                    type="number"
                    className="border  border-blue-400  rounded px-3 py-2 w-full"
                    placeholder="Price"
                  />
                </div>
                <div className="mb-4 w-1/2 mr-2">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Category
                  </label>
                  <select
                    {...register("category")}
                    id="category"
                    className="border border-blue-400 rounded px-3 py-2 w-full"
                  >
                    <option value="Fever & Pain">Fever & Pain</option>
                    Baby Products & Medicine
                    <option value=" Baby Products & Medicine">
                      Baby Products & Medicine
                    </option>
                    <option value="Pet Medicine">Pet Medicine </option>
                    <option value="Pet Food">Pet Food </option>
                    <option value="Vitamin & Supplements">
                      Vitamin & Supplements
                    </option>
                    <option value="Diabetes">Diabetes </option>
                    <option value="Digestive Health">Digestive Health </option>
                    <option value="Allergey & Asthma">
                      Allergey & Asthma{" "}
                    </option>
                  </select>
                </div>

                <div className="mb-4 w-1/2 ">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Origin
                  </label>
                  <input
                    {...register("country")}
                    id="country"
                    className="border  border-blue-400 rounded px-3 py-2 w-full"
                    placeholder="Origin"
                  />
                </div>
              </div>

              {/* des & measurement */}

              <div className="flex justify-between mx-2">
                <div className="mb-4 w-1/2  mr-2">
                  <label
                    htmlFor="productDescription"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    {...register("productDescription")}
                    id="productDescription"
                    className="border  border-blue-400 resize rounded-md  px-3  py-2 w-full "
                    placeholder="Description"
                  />
                </div>

                <div className="mb-4 w-1/2 ">
                  <label
                    htmlFor="measurement"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Measurement
                  </label>
                  <input
                    {...register("measurement")}
                    id="measurement"
                    className="border  border-blue-400 rounded px-3 py-2 w-full"
                    placeholder="Measurement"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-4 mr-2">
                <Button>Save</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUserModal;
