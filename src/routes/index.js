import express from 'express';

import RandomNumberGen from '../controller/index';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();
const { generateToken, generateNumber, getAllNumber } = RandomNumberGen;

router.get('/token', generateToken);
router.post('/generate', verifyToken, generateNumber);
router.get('/numbers', verifyToken, getAllNumber);

export default router;
