import express from 'express';
import {
    getDailySales,
    getLowStockMedicines,
} from '../Controllers/reportController.js';

const router = express.Router();

router.get('/sales/daily', getDailySales);
router.get('/inventory/low-stock', getLowStockMedicines);

export default router;