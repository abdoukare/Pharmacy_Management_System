import express from 'express';
import {
    getDailySales,
    getLowStockMedicines,
} from '../Controllers/reportController.js';

const router = express.Router();

router.get('/daily-sales', getDailySales);
router.get('/low-stock-medicines', getLowStockMedicines);

export default router;