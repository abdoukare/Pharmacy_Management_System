import express from 'express';
import { recordpurchase, getPurchases } from '../Controllers/PurchaseController.js';

const router = express.Router();

// purchase routs 

router.post('/', recordpurchase);
router.get('/', getPurchases);

export default router;