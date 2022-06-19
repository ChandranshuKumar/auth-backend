import { Request, Response, NextFunction } from "express";
import { CLIENT_ERR, EMAIL_ALREADY_EXISTS_ERR, EMAIL_INVALID } from "../constants/error";
import { NEW_USER_CREATED } from "../constants/success";
import { isValidEmail } from "../helpers/validations";
import User from "../models/User";

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { email = '', password = '' } = req.body;

        if(!email || !password){
            next({ status: 400, message: CLIENT_ERR });
            return;
        }

        if(!isValidEmail(email)){
            next({ status: 400, message: EMAIL_INVALID });
            return;
        }

        const emailExists = await User.findOne({ email });
        if (emailExists) {
            next({ status: 400, message: EMAIL_ALREADY_EXISTS_ERR });
            return;
        };

        const createUser = new User({ email, password });
        const user = await createUser.save();
        res.status(201).json({
            type: "success",
            message: NEW_USER_CREATED,
            data: {
                userId: user._id
            }
        });
    }
    catch (err) {
        next(err);
    }
}

export const loginUser = () => {

}