import { Schema, model } from 'mongoose';
import { IOrder, OrderModel } from './order.interface';

const orderSchema = new Schema({
  _id: String,
  name: String,
  productDescription: String,
  measurement: String,
  company: String,
  generic: String,
  category: String,
  price: Number,
  country: String,
  url: String,
  id: Number,
  quantity: Number,
});

const OrderSchema = new Schema<IOrder>(
  {
    orderedItems: [orderSchema],
    orderId: String,
    shippingAddress: { type: String },
    total: { type: Number },
    contactNumber: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'Student' },
    orderDate: {
      type: String,
    },
    paymentStatus: {
      type: String,
      default: 'pending',
    },
    delivaryStatus: {
      type: String,
      default: 'pending',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Order = model<IOrder, OrderModel>('Order', OrderSchema);
