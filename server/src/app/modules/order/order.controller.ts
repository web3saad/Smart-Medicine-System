import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendReponse from '../../../shared/sendResponse';
import { IOrder } from './order.interface';
import { OrderService } from './order.services';

const sendOrderResponse = (res: Response, message: string, data: any) => {
  sendReponse<IOrder>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message,
    data,
  });
};

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const OrderData = req.body;
  const result = await OrderService.createOrder(OrderData);
  sendOrderResponse(res, 'Order is Created Successfully!', result);
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OrderService.getAllOrders(id);
  sendOrderResponse(res, 'Orders  are retrieved successfully !', result);
});
const getAllOrdersForAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllOrdersForAdmin();
  sendOrderResponse(res, 'Orders  are retrieved successfully !', result);
});

const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OrderService.deleteOrder(id);
  sendOrderResponse(res, ' Order Deleted successfully !', result);
});
const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OrderService.getSingleOrder(id);
  sendOrderResponse(res, 'Single Order retrieved successfully !', result);
});
const updateOrder = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const UpdateData = req.body;
  const result = await OrderService.updateOrder(id, UpdateData);
  sendOrderResponse(res, 'Single Order retrieved successfully !', result);
});
const getLastWeekSalesSummary = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getLastWeekSalesSummary();

  sendReponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Last week sales summary retrieved successfully',
    data: result,
  });
});
const getMonthSalesSummary = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getLastMonthSalesSummary();

  sendReponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Last month sales summary retrieved successfully',
    data: result,
  });
});
const getRecentOrders = catchAsync(async (req: Request, res: Response) => {
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;
  const result = await OrderService.getRecentOrders(limit);
  
  sendReponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Recent orders retrieved successfully',
    data: result
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
  getAllOrdersForAdmin,
  deleteOrder,
  getSingleOrder,
  updateOrder,
  getMonthSalesSummary,
  getRecentOrders
};
