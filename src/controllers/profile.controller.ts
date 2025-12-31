import httpStatus from "http-status";
import Profile from "../models/Profile.model";
import { IResponse } from "../types/response";
import { Request, Response } from "express";


// create Profile
const createProfile = async (req: Request, res: Response) => {
    try {
        const profile = await Profile.create(req.body);
        return res.status(httpStatus.CREATED).send({
            error: false,
            statusCode: httpStatus.CREATED,
            data: profile,
            message: "profile created successfully.",
        });
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
//get all profiles
const getProfiles = async (req: Request, res: Response) => {
    try {
        const profiles = await Profile.findAll();//excludes softdeleted by default
        return res.status(httpStatus.OK).send({
            error: false,
            statusCode: httpStatus.OK,
            data: profiles,
            message: "profiles fetched successfully.",
        });
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
//get single profile
const getProfileById = async (req: Request, res: Response) => {
    try {
        console.log("")
        const profile = await Profile.findByPk(req.params.profileId);
        if (!profile) {
            return res.status(httpStatus.NOT_FOUND).send({
                error: true,
                statusCode: httpStatus.NOT_FOUND,
                data: {},
                message: "Profile not found",
            });
        }
        return res.status(httpStatus.OK).send({
            error: false,
            statusCode: httpStatus.OK,
            data: profile,
            message: "profile fetched successfully.",
        });
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
        const { name } = req.body;

        const profile = await Profile.findByPk(req.params.profileId);

        if (!profile) {
            return res.status(httpStatus.NOT_FOUND).json({
                error: true,
                statusCode:  httpStatus.NOT_FOUND,
                data: {},
                message: "Profile not found",
            });
        }

        // update field
        profile.name = name;
        await profile.save();

        return res.status(httpStatus.OK).json({
            error: false,
            statusCode: httpStatus.OK,
            data: profile,
            message: "Profile updated successfully",
        });
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
        const profile = await Profile.findByPk(req.params.profileId);
        if (!profile) {
            return res.status(httpStatus.NOT_FOUND).send({
                error: true,
                statusCode: httpStatus.NOT_FOUND,
                data: {},
                message: "Profile not found",
            });
        }
        await profile.destroy();
        return res.status(httpStatus.OK).send({
            error: false,
            statusCode: httpStatus.OK,
            data: profile,
            message: "profile softdeleted successfully.",
        });
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
export default {
    createProfile,
    getProfiles,
    getProfileById,
    updateProfile,
    deleteProfile,
}