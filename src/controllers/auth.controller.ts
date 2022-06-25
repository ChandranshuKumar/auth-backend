import { Request, Response, NextFunction } from 'express';
import {
	CLIENT_ERR,
	EMAIL_ALREADY_EXISTS_ERR,
	EMAIL_DOES_NOT_EXISTS,
	EMAIL_INVALID,
	WRONG_PASSWORD
} from '../constants/error';
import { LOGIN_SUCCESS, NEW_USER_CREATED } from '../constants/success';
import { isValidEmail } from '../helpers/validations';
import User from '../models/User';
import { comparePassword, createPasswordHash } from '../utils/password.util';
import { createJwtToken } from '../utils/token.util';

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		let { email = '', password = '' } = req.body;

		if (!email || !password) {
			next({ status: 400, message: CLIENT_ERR });
			return;
		}

		if (!isValidEmail(email)) {
			next({ status: 400, message: EMAIL_INVALID });
			return;
		}

		const emailExists = await User.findOne({ email });
		if (emailExists) {
			next({ status: 400, message: EMAIL_ALREADY_EXISTS_ERR });
			return;
		}

		const hashedPassword = await createPasswordHash(password);
		const createUser = new User({ email, password: hashedPassword });
		const newUser = await createUser.save();
		const token = createJwtToken({ userId: newUser._id });
		res.status(201).json({
			type: 'success',
			message: NEW_USER_CREATED,
			data: {
				token
			}
		});
	} catch (err) {
		next(err);
	}
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		let { email = '', password = '' } = req.body;

		if (!email || !password) {
			next({ status: 400, message: CLIENT_ERR });
			return;
		}

		const user = await User.findOne({ email });
		if (!user) {
			next({ status: 400, message: EMAIL_DOES_NOT_EXISTS });
			return;
		}

		const isPasswordMatched = await comparePassword(password, user.password);
		if (!isPasswordMatched) {
			next({ status: 400, message: WRONG_PASSWORD });
			return;
		}

		const token = createJwtToken({ userId: user._id });
		res.status(200).json({
			type: 'success',
			message: LOGIN_SUCCESS,
			data: {
				token
			}
		});
	} catch (err) {
		next(err);
	}
};
