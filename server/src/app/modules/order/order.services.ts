/* eslint-disable no-unused-vars */

import { customDateFormat } from '../../../helpers/customDateFormat';
import { generateId } from '../../../helpers/generateId';
import { IOrder } from './order.interface';
import { Order } from './order.model';

const createOrder = async (payload: IOrder): Promise<IOrder> => {
  const date = new Date();
  const formattedDate = customDateFormat(date);
  const generateID = await generateId(Order, 'O', 'orderId');
  console.log('🚀 ~ createOrder ~ generateID:', generateID);

  const productRequestPayload = {
    ...payload,
    orderId: generateID,
    orderDate: formattedDate,
  };
  const result = await Order.create(productRequestPayload);
  return result;
};

const getAllOrders = async (userId: string) => {
  const orders = await Order.find({ userId }).lean();
  return orders;
};

const getAllOrdersForAdmin = async () => {
  const res = await Order.find({}).lean();
  return res;
};

const getSingleOrder = async (id: string) => {
  const result = await Order.findOne({ orderId: id })
    .populate('orderedItems')
    .populate('userId');
  return result;
};

const deleteOrder = async (id: string) => {
  const result = await Order.findByIdAndDelete(id);
  return result;
};

const updateOrder = async (
  id: string,
  payload: Partial<IOrder>
): Promise<IOrder | null> => {
  const result = await Order.findOneAndUpdate({ orderId: id }, payload, {
    new: true,
  });
  return result;
};

const getLastWeekSalesSummary = async () => {
  // Get date for 7 days ago
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);

  const orders = await Order.find({
    createdAt: { $gte: lastWeek },
  });

  const summary = {
    totalOrders: orders.length,
    totalSales: orders.reduce((sum, order) => sum + (order.total || 0), 0),
    totalDelivered: orders.filter(
      (order) => order.delivaryStatus === 'delivered'
    ).length,
    totalPending: orders.filter((order) => order.delivaryStatus === 'pending')
      .length,
    dailyOrders: Array(7).fill(0),
    dailySales: Array(7).fill(0),
  };

  // Calculate daily stats
  orders.forEach((order) => {
    const dayIndex =
      6 -
      Math.floor(
        (new Date().getTime() - new Date(order.createdAt).getTime()) /
          (1000 * 60 * 60 * 24)
      );
    if (dayIndex >= 0 && dayIndex < 7) {
      summary.dailyOrders[dayIndex]++;
      summary.dailySales[dayIndex] += order.total || 0;
    }
  });

  return summary;
};

const getLastMonthSalesSummary = async () => {
  try {
    // Get date for 30 days ago
    const lastMonth = new Date();
    lastMonth.setDate(lastMonth.getDate() - 30);

    // Get orders for last 30 days
    const orders = await Order.find({}).lean();
    console.log('Found orders:', orders.length);

    const summary = {
      totalOrders: 0,
      totalSales: 0,
      totalDelivered: 0,
      totalPending: 0,
      weeklyData: Array(4)
        .fill(null)
        .map(() => ({
          orders: 0,
          sales: 0,
          delivered: 0,
          pending: 0,
        })),
      growth: {
        sales: 0,
        orders: 0,
      },
    };

    if (!orders || !orders.length) {
      console.log('No orders found');
      return summary;
    }

    // Current period stats
    summary.totalOrders = orders.length;
    summary.totalSales = orders.reduce(
      (sum, order) => sum + (order.total || 0),
      0
    );
    summary.totalDelivered = orders.filter(
      (order) => order.delivaryStatus === 'delivered'
    ).length;
    summary.totalPending = orders.filter(
      (order) => order.delivaryStatus === 'pending'
    ).length;

    // Weekly breakdown
    orders.forEach((order) => {
      if (!order.orderDate) return;

      const orderDate = new Date(order.orderDate);
      const daysSince = Math.floor(
        (new Date().getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysSince <= 30) {
        const weekIndex = Math.min(3, Math.floor(daysSince / 7));

        if (weekIndex >= 0 && weekIndex < 4) {
          summary.weeklyData[weekIndex].orders += 1;
          summary.weeklyData[weekIndex].sales += order.total || 0;

          if (order.delivaryStatus === 'delivered') {
            summary.weeklyData[weekIndex].delivered += 1;
          } else if (order.delivaryStatus === 'pending') {
            summary.weeklyData[weekIndex].pending += 1;
          }
        }
      }
    });

    console.log('Calculated summary:', summary);
    return summary;
  } catch (error) {
    console.error('Error in getLastMonthSalesSummary:', error);
    throw error;
  }
};

const getRecentOrders = async (limit = 5) => {
  try {
    const recentOrders = await Order.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return recentOrders;
  } catch (error) {
    console.error('Error in getRecentOrders:', error);
    throw error;
  }
};

export const OrderService = {
  createOrder,
  deleteOrder,
  getAllOrders,
  getSingleOrder,
  getAllOrdersForAdmin,
  updateOrder,
  getLastWeekSalesSummary,
  getLastMonthSalesSummary,
  getRecentOrders,
};
