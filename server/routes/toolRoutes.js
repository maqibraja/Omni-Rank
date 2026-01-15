import express from 'express';
const router = express.Router();
import { auditSite, getKeywords, checkRank } from '../controllers/toolController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/audit', protect, auditSite);
router.post('/keywords', protect, getKeywords);
router.post('/rank', protect, checkRank);

export default router;
