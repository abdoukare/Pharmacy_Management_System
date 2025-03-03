import express from 'express';
import { recordSale, getSales } from '../Controllers/SalesControllers.js';

const router = express.Router();

router.post('/', recordSale);
router.get('/', getSales);
export default router;