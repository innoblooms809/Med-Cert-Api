import httpStatus from "http-status";
// import Profile from "../models/Profile.model";
import { IResponse } from "../types/response";
import { Request, Response } from "express";
import profileService from "../services/profile.service";


// create Profile
const createProfile = async (req: Request, res: Response) => {
    try {
        const result = await profileService.createProfile(req.body);
        return res.status(result.statusCode).send(result);
    } catch (e: any) {
        console.error(e);
        return res.status(httpStatus.BAD_REQUEST).send({
            error: true,
            statusCode: httpStatus.BAD_REQUEST,
            data: {},
            message: `Something went wrong: ${e.message}`,
        });
    }
}
// Admin: get all profiles (active + inactive)
const getProfilesForAdmin = async (req: Request, res: Response) => {
    try {
        const result = await profileService.getProfilesForAdmin();
        return res.status(result.statusCode).send(result);
    } catch (e: any) {
        console.error(e);
        return res.status(httpStatus.BAD_REQUEST).send({
            error: true,
            statusCode: httpStatus.BAD_REQUEST,
            data: {},
            message: `Something went wrong: ${e.message}`,
        });
    }
}
// frontend: get all profiles (active )
const getActiveProfiles = async (req: Request, res: Response) => {
    try {
        const result = await profileService.getActiveProfiles();
        return res.status(result.statusCode).send(result);
    } catch (e: any) {
        console.error(e);
        return res.status(httpStatus.BAD_REQUEST).send({
            error: true,
            statusCode: httpStatus.BAD_REQUEST,
            data: {},
            message: `Something went wrong: ${e.message}`,
        });
    }
}
//get single profile for frontend
const getProfileById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await profileService.getProfileById(Number(id));
        return res.status(result.statusCode).send(result);
    } catch (e: any) {
        console.error(e);
        return res.status(httpStatus.BAD_REQUEST).send({
            error: true,
            statusCode: httpStatus.BAD_REQUEST,
            data: {},
            message: `Something went wrong: ${e.message}`,
        });
    }
}

//get single profile for Admin
const getProfileByIdForAdmin = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await profileService.getProfileByIdForAdmin(Number(id));
        return res.status(result.statusCode).send(result);
    } catch (e: any) {
        console.error(e);
        return res.status(httpStatus.BAD_REQUEST).send({
            error: true,
            statusCode: httpStatus.BAD_REQUEST,
            data: {},
            message: `Something went wrong: ${e.message}`,
        });
    }
}
//update Profile
const updateProfile = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await profileService.updateProfile(Number(id), req.body);

        return res.status(result.statusCode).send(result);
    } catch (e: any) {
        console.error(e);
        return res.status(httpStatus.BAD_REQUEST).json({
            error: true,
            statusCode: httpStatus.BAD_REQUEST,
            data: {},
            message: `Something went wrong: ${e.message}`,
        });
    }
};

// soft delete profile
const deleteProfile = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await profileService.deleteProfile(Number(id));

        return res.status(result.statusCode).send(result);
    } catch (e: any) {
        console.error(e);
        return res.status(httpStatus.BAD_REQUEST).send({
            error: true,
            statusCode: httpStatus.BAD_REQUEST,
            data: {},
            message: `Something went wrong: ${e.message}`,
        });
    }
}

// restore Profile
const restoreProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await profileService.restoreProfile(Number(id));
    return res.status(result.statusCode).send(result);
  } catch (e: any) {
    return res.status(httpStatus.BAD_REQUEST).send({
      error: true,
      statusCode: httpStatus.BAD_REQUEST,
      data: {},
      message: e.message,
    });
  }
};

export default {
    createProfile,
    getProfilesForAdmin,
    getActiveProfiles,
    getProfileById,
    getProfileByIdForAdmin,
    updateProfile,
    deleteProfile,
    restoreProfile
}