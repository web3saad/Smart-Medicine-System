import { IProduct } from './product.interface';
import { Product } from './product.model';

const createProduct = async (payload: IProduct): Promise<IProduct> => {
  let count = await Product.countDocuments();
  const id = count++;
  const result = await Product.create({ id: id, ...payload });
  return result;
};

const getAllProducts = async (page: any, searchText: any, limit: any) => {
  const skip = Math.max(0, (page - 1) * limit);
  const searchQuery =
    searchText && searchText!='undefined'
      ? {
          $or: [
            { name: { $regex: searchText, $options: 'i' } },
            { generic: { $regex: searchText, $options: 'i' } },
            { company: { $regex: searchText, $options: 'i' } },
            { productDescription: { $regex: searchText, $options: 'i' } },
          ],
        }
      : {};
  const result = await Product.find(searchQuery).skip(skip).limit(limit);
  return result;
};

const getSingleProduct = async (id: string) => {
  const result = await Product.findById({ _id: id });
  return result;
};

const deleteProduct = async (id: string) => {
  const result = await Product.findOneAndDelete({ id: id });
  return result;
};
const updateProduct = async (
  id: string,
  payload: Partial<IProduct>
): Promise<IProduct | null> => {
  const result = await Product.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const ProductService = {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
};
