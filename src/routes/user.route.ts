import express from 'express';
import checkAuth from '../middlewares/checkAuth';
import { getUser } from '../controllers/user.controller';

const router = express.Router();

router.get("/me", checkAuth, getUser);

export default router;