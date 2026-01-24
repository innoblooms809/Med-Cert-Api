import { Request, Response } from "express";
import httpStatus from "http-status";
import authService from "../../services/auth/auth.service";

/**
 * REGISTER USER
 */
const register = async (req: Request, res: Response) => {
  try {
    const result = await authService.registerUser(req.body);
    return res.status(result.statusCode).json(result);
  } catch (e: any) {
    return res.status(httpStatus.BAD_REQUEST).json({
      error: true,
      statusCode: httpStatus.BAD_REQUEST,
      data: {},
      message: e.message,
    });
  }
};

/**
 * LOGIN USER
 */
const login = async (req: Request, res: Response) => {
  try {
    const { emailId, password } = req.body;

    const result = await authService.loginUser(emailId, password);
    return res.status(result.statusCode).json(result);
  } catch (e: any) {
    return res.status(httpStatus.BAD_REQUEST).json({
      error: true,
      statusCode: httpStatus.BAD_REQUEST,
      data: {},
      message: e.message,
    });
  }
};

export default {
  register,
  login,
};