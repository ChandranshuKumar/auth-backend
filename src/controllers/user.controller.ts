import { Request, Response, NextFunction } from 'express';
import { USER_FETCHED_SUCCESS } from '../constants/success';

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const currentUser = res.locals.user;
		res.status(200).json({
			type: 'success',
			message: USER_FETCHED_SUCCESS,
			data: {
				user: currentUser
			}
		});
	} catch (err) {
		next(err);
	}
};
