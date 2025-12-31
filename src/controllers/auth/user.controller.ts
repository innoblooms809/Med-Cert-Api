import httpStatus from "http-status";
// import Master from "../../";
import { Request, response, Response } from "express";
import { userServices } from "../../services";
import tokenService from "../../services/token.service";
import { error } from "console";
import svgCaptcha from "svg-captcha";
import { sendEmailToNewUser } from "../../utils/mailHelper";
import Specialization from "../../models/Specialization.model";
import Profile from "../../models/Profile.model";
import SubSpecialization from "../../models/SubSpecialization.model";
interface IGetUserInfoRequest extends Request {
  session: any 
}

const getUser = async (req: Request, res: Response) => {
  try {
    const response = await userServices.userGet();
    return res.status(httpStatus.OK).send(response);
    
  } catch (error) {
    console.error("Error fetching masters:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const response = await userServices.userCreate(req);
    // await sendEmailToNewUser({ ...req.body, password: response.password });
    res.status(response.statusCode).send(response);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: true,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      data: {},
      message: "Internal Server Error",
    });
  }
};

const getRole = async(req: Request, res: Response) => {
try{
  const response = await userServices.getRoles(req);
  res.status(response.statusCode).send(response);
}catch(error){
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: true,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      data: {},
      message: "Internal Server Error",
    });
}
};
const getProfiles = async (req: Request, res: Response) => {
  const profiles = await Profile.findAll();
  res.status(200).json({ success: true, data: profiles });
};

const getSpecializationsByProfile =async(req:Request,res:Response)=>{
  try{
  const { profileId } = req.params;

  const data = await Specialization.findAll({
    where: { profileId },
  });

  res.status(200).json({
    success: true,
    data,
  });
  }
  catch(error){
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: true,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      data: {},
      message: "Internal Server Error",
    });
}
}

const getSubSpecializationsBySpecialization  =async(req:Request,res:Response)=>{
  try{
    const { specializationId } = req.params;

  const data = await SubSpecialization.findAll({
    where: { specializationId  },
  });

  res.status(200).json({
    success: true,
    data,
  });
  }
  catch(error){
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: true,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      data: {},
      message: "Internal Server Error",
    });
}
}

const getCaptcha = async (req: IGetUserInfoRequest, res: any) => {
  const captcha = svgCaptcha.create();
  req.session.captcha = captcha.text; // Save the CAPTCHA text in session
  res.set("Content-Type", "image/svg+xml");
  res.send(captcha.data);
};

const loginUser = async (req: IGetUserInfoRequest, res: Response) => {
  try {
    const { emailId,  password, captcha } = req?.body;//phoneNumber, type,
    // if (captcha !== req.session.captcha) {
    //   return res.status(400).json({ message: "Invalid CAPTCHA" });
    // }
    const user = await userServices.userLogin(
      emailId,
      password
    );

    if (user.error) {
      return res.status(response.statusCode).send(user);
    }
    const token = await tokenService.generateUserAuthTokens(user.data.user);
    return res.status(httpStatus.CREATED).send({
      error: false,
      statusCode: httpStatus.OK,
      message: "User Logged in Successfully",
      token
      // permissions: user.data.permissions,
    });
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: true,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      data: {},
      message: "Internal Server Error",
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req?.params;
    const updatedUser = await userServices.userUpdate(userId, req?.body);
    return res.status(response.statusCode).send(updatedUser);
  } catch (e) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: true,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      data: {},
      message: "Internal Server Error",
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req?.params;
    console.log(userId)
    const getUser = await userServices.singleUserGet(userId);
    return res.status(response.statusCode).send(getUser);
  } catch (e) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: true,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      data: {},
      message: "Internal Server Error",
    });
  }
};
export default {
  getUser,
  createUser,
  loginUser,
  getCaptcha,
  updateUser,
  getSingleUser,
  getRole,
  getProfiles,
  getSpecializationsByProfile,
  getSubSpecializationsBySpecialization,
};
