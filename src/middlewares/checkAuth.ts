import { Request, Response, NextFunction } from 'express';
import {
	AUTH_HEADER_MISSING_ERR,
	AUTH_TOKEN_MISSING_ERR,
	JWT_DECODE_ERR,
	USER_NOT_FOUND_ERR
} from '../constants/error';
import { verifyJwtToken } from '../utils/token.util';
import User from '../models/User';

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const header = req.headers.authorization;
		if (!header) {
			next({ status: 401, message: AUTH_HEADER_MISSING_ERR });
			return;
		}

		const token = header.split('Bearer ')[1];
		if (!token) {
			next({ status: 401, message: AUTH_TOKEN_MISSING_ERR });
			return;
		}

		const userId: string | undefined = verifyJwtToken(token);
		if (!userId) {
			next({ status: 401, message: JWT_DECODE_ERR });
			return;
		}

		const user = await User.findById(userId);
		if (!user) {
			next({ status: 404, message: USER_NOT_FOUND_ERR });
			return;
		}

		res.locals.user = user;
		next();
	} catch (err) {
		next(err);
	}
};

export default checkAuth;
