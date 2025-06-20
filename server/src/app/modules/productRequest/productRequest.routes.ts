import express from 'express';

import { ProductRequestController } from './productRequest.controller';

const router = express.Router();

router.post('/create-request', ProductRequestController.createProductRequest);
router.delete('/:id', ProductRequestController.deleteProductRequest);
router.get('/:id', ProductRequestController.getAllProductRequests);
router.get('/all', ProductRequestController.getAllProductRequestsForAdmin);
router.get('/all/admin', ProductRequestController.getAllProductRequestsForAdmin); // Add this line

export const ProductRequestRoutes = router;