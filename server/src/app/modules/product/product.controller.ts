/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendReponse from '../../../shared/sendResponse';
import { IProduct } from './product.interface';
import { ProductService } from './product.services';

const sendProductResponse = (res: Response, message: string, data: any) => {
  sendReponse<IProduct>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message,
    data,
  });
};

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const productData = { ...req.body };
  if (req.file) {
    productData.imageUrl = req.file.filename; // or req.file.path if you want full path
  }
  const result = await ProductService.createProduct(productData);
  sendProductResponse(res, 'Product is Created Successfully!', result);
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const { page, limit, searchText } = req.query;
  const result = await ProductService.getAllProducts(page,searchText, limit);
  sendProductResponse(res, 'Products retrieved successfully !', result);
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ProductService.deleteProduct(id);
  sendProductResponse(res, ' Product Deleted successfully !', result);
});
const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ProductService.getSingleProduct(id);
  sendProductResponse(res, 'Single Product retrieved successfully !', result);
});
const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const UpdateData = req.body;
  const result = await ProductService.updateProduct(id, UpdateData);
  sendProductResponse(res, 'Product Data Is Updated successfully!', result);
});

export const productController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
};
