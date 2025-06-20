import express from 'express';
import { OrderController } from './order.controller';


const router = express.Router();

router.get(
  '/month-sales-summary',
  OrderController.getMonthSalesSummary
);
router.get('/recent-orders', OrderController.getRecentOrders);
router.get('/all-orders', OrderController.getAllOrdersForAdmin);
router.post('/create-order', OrderController.createOrder);
router.get('/all-order-user/:id', OrderController.getAllOrders);
router.get('/:id', OrderController.getSingleOrder);
router.delete('/:id', OrderController.deleteOrder);
router.patch('/:id', OrderController.updateOrder);

export const OrderRoutes = router;
