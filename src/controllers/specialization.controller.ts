import httpStatus from "http-status";
import { Request, Response } from "express";
import specializationService from "../services/specialization.service";


// create Specialization
const createSpecialization = async (req: Request, res: Response) => {
    try {
        const result = await specializationService.createSpecialization(req.body);
        return res.status(result.statusCode).json(result);
    } catch (e: any) {
        console.error(e);
        return res.status(httpStatus.BAD_REQUEST).json({
            error: true,
            statusCode: httpStatus.BAD_REQUEST,
            data: {},
            message: `Something went wrong: ${e.message}`,
        });
    }
}
// Admin: get all specializations (active + inactive)
const getSpecializationsForAdmin = async (req: Request, res: Response) => {
    try {
        const result = await specializationService.getSpecializationsForAdmin();
        return res.status(result.statusCode).json(result);
    } catch (e: any) {
        console.error(e);
        return res.status(httpStatus.BAD_REQUEST).json({
            error: true,
            statusCode: httpStatus.BAD_REQUEST,
            data: {},
            message: `Something went wrong: ${e.message}`,
        });
    }
}
// frontend: get all profiles (active )
const getActiveSpecializations = async (req: Request, res: Response) => {
    try {
        const profileId = Number(req.query.profileId); // or from req.user if auth
        if (!profileId) {
            return res.status(httpStatus.BAD_REQUEST).json({
                error: true,
                statusCode: httpStatus.BAD_REQUEST,
                data: {},
                message: "profileId is required",
            });
        }
        const result = await specializationService.getActiveSpecializations(profileId);
        return res.status(result.statusCode).json(result);
    } catch (e: any) {
        console.error(e);
        return res.status(httpStatus.BAD_REQUEST).json({
            error: true,
            statusCode: httpStatus.BAD_REQUEST,
            data: {},
            message: `Something went wrong: ${e.message}`,
        });
    }
}
//get single specialization
const getSpecializationById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await specializationService.getSpecializationById(Number(id));
        return res.status(result.statusCode).json(result);
    } catch (e: any) {
        console.error(e);
        return res.status(httpStatus.BAD_REQUEST).json({
            error: true,
            statusCode: httpStatus.BAD_REQUEST,
            data: {},
            message: `Something went wrong: ${e.message}`,
        });
    }
}
// get single Specialization for Admin
const getSpecializationByIdForAdmin = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await specializationService.getSpecializationByIdForAdmin(Number(id));
        return res.status(result.statusCode).json(result);
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

//update Specialization
const updateSpecialization = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await specializationService.updateSpecialization(Number(id), req.body);

        return res.status(result.statusCode).json(result);
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

// soft delete specialization
const deleteSpecialization = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await specializationService.deleteSpecialization(Number(id));

        return res.status(result.statusCode).json(result);
    } catch (e: any) {
        console.error(e);
        return res.status(httpStatus.BAD_REQUEST).json({
            error: true,
            statusCode: httpStatus.BAD_REQUEST,
            data: {},
            message: `Something went wrong: ${e.message}`,
        });
    }
}

// restore a deleted specialization
const restoreSpecialization = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await specializationService.restoreSpecialization(Number(id));
        return res.status(result.statusCode).json(result);
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

export default {
    createSpecialization,
    getSpecializationsForAdmin,
    getActiveSpecializations,
    getSpecializationById,
    getSpecializationByIdForAdmin,
    updateSpecialization,
    deleteSpecialization,
    restoreSpecialization
}