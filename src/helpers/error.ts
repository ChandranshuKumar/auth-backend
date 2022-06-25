import { Request, Response, NextFunction } from 'express';
import { API_ENDPOINT_NOT_FOUND_ERR, SERVER_ERR } from '../constants/error';
import { Err } from '../interfaces';

export const handle404 = (req: Request, res: Response, next: NextFunction) => {
	const error = {
		status: 404,
		message: API_ENDPOINT_NOT_FOUND_ERR
	};
	next(error);
};

export const globalErrorHandling = (err: Err, req: Request, res: Response, next: NextFunction) => {
	const status = err.status || 500;
	const responsePayload = {
		type: 'error',
		message: err.message || SERVER_ERR,
		data: err.data || null
	};
	res.status(status).json(responsePayload);
};
