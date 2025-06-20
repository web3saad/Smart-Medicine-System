/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model } from 'mongoose';

export type IWeeklyData = {
  orders: number;
  sales: number;
  delivered: number;
  pending: number;
};

export type ISalesSummary = {
  totalOrders: number;
  totalSales: number;
  totalDelivered: number;
  totalPending: number;
  weeklyData: IWeeklyData[];
  growth: {
    sales: number;
    orders: number;
  };
};

export type IOrder = {
  orderedItems: Array<{
    _id: string;
    name: string;
    productDescription: string;
    measurement: string;
    company: string;
    generic: string;
    category: string;
    price: number;
    country: string;
    url: string;
    id: number;
    quantity: number;
  }>;
  orderId: string;
  shippingAddress: string;
  total: number;
  contactNumber: string;
  userId: string;
  orderDate: string;
  paymentStatus: 'pending' | 'completed';
  delivaryStatus: 'pending' | 'delivered';
  createdAt?: Date;
};

export type OrderModel = Model<IOrder>;
