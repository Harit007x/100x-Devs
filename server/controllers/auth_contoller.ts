import { ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import UserModel from '../models/user_model';
import MappingModel from '../models/mapping_model';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();
const signUp = async (req:Request, res:Response) => {
    try {
        console.log("req ",req.body)
        const {
            first_name,
            last_name,
            user_name,
            password

        } = req.body;

        // Unique username check
        const user_exists = await UserModel.findOne({user_name})
        if(user_exists){
            return res.status(400).json({status: 400, success: false, customError: "Username is already taken." })
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const encrypted_password = await bcrypt.hash(password, salt);

        const user_obj = new UserModel({
            first_name,
            last_name,
            "full_name": `${first_name} ${last_name}`,
            user_name,
            "password": encrypted_password,
        })

        const savedUser = await user_obj.save()

        console.log("saved usr -", savedUser);
        const mapping_obj = new MappingModel({
            "user_id": savedUser._id.toString(),
            "mapping": []
        })
        const savedMapping = await mapping_obj.save()
        console.log("saved map =", savedMapping)

        res.status(201).json({ status: 201, success: true, data: {}, message: "Account Created Successfully" });
    } catch (error) {
        console.error('Error creating TODO:', error);
        res.status(500).json({ status: 500, success: false, error: 'Internal Server Error' });
    }
}

const login = async (req:Request, res:Response) => {
    try {
        const {user_name, password} = req.body;

        if(!user_name){
            return res.status(403).json({status: 500, success: false, error: 'Username is null' })
        }

        const user_obj = await UserModel.findOne({user_name});
        if (!user_obj) return res.status(400).send("Invalid email or password");

        const validatePassword = await bcrypt.compare(
            password,
            user_obj.password
        );

        if(!validatePassword){
            return res.status(400).json({status: 500, customError: "Incorrect email or password"})
        }

        // 1 hour in seconds
        const accessExpiresIn = 1 * 60 * 60; // 3600 seconds
        // 1 day in seconds
        const refreshExpiresIn = 1 * 24 * 60 * 60; // 86400 seconds

        const token = user_obj.generateAuthToken(accessExpiresIn);
        const refreshToken = user_obj.generateAuthToken(refreshExpiresIn);
        
        res.cookie('access_token', token, { 
            httpOnly: true,
            // maxAge: expiresIn * 1000,
            // secure: false,
            // sameSite: 'strict',
        });
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
        })

        return res.status(201).json({ success: true, data: {}, message: "Logged-In Successfully" });

    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }

}

const logout = async (req:Request, res:Response) => {
    try {
        const {user_name, password} = req.body;

        if(!user_name){
            return res.status(403).json({status: 500, success: false, error: 'Username is null' })
        }

        const user_obj = await UserModel.findOne({user_name});
        if (!user_obj) return res.status(400).send("Invalid email or password");

        const validatePassword = await bcrypt.compare(
            password,
            user_obj.password
        );

        if(!validatePassword){
            return res.status(400).json({status: 500, customError: "Incorrect email or password"})
        }

        // 1 hour in seconds
        const accessExpiresIn = 1 * 60 * 60; // 3600 seconds
        // 1 day in seconds
        const refreshExpiresIn = 1 * 24 * 60 * 60; // 86400 seconds

        const token = user_obj.generateAuthToken(accessExpiresIn);
        const refreshToken = user_obj.generateAuthToken(refreshExpiresIn);
        
        res.cookie('access_token', token, { 
            httpOnly: true,
            // maxAge: expiresIn * 1000,
            // secure: false,
            // sameSite: 'strict',
        });
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
        })

        return res.status(201).json({ success: true, data: {}, message: "Logged-In Successfully" });

    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }

}

// export all
export const authController = {
    signUp,
    login,
};