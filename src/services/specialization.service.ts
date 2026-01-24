import httpStatus from "http-status";
import { IResponse } from "../types/response";
import Specialization from "../models/Specialization.model";
import { Op } from "sequelize";

// create Specialization
const createSpecialization = async (body: { name: string; profileId: number }): Promise<IResponse> => {
    try {
        const existing = await Specialization.findOne({ where: { name: body.name, profileId: body.profileId, isActive: true, } });
        if (existing) {
            return {
                error: true,
                statusCode: httpStatus.CONFLICT,
                data: {},
                message: "Specialization already exists",
            };
        }
        const specialization = await Specialization.create(body);
        return {
            error: false,
            statusCode: httpStatus.CREATED,
            data: specialization,
            message: "Specialization created successfully.",
        };
    } catch (e: any) {
        console.error(e);
        return {
            error: true,
            statusCode: httpStatus.BAD_REQUEST,
            data: {},
            message: `Something went wrong: ${e.message}`,
        };
    }
}
// Admin: get all specializations (active + inactive)
const getSpecializationsForAdmin = async (): Promise<IResponse> => {
    try {
        const specializations = await Specialization.findAll({ order: [["createdAt", "DESC"]] });
        return {
            error: false,
            statusCode: httpStatus.OK,
            data: specializations,
            message: "All specializations fetched successfully.",
        };
    } catch (e: any) {
        return {
            error: true,
            statusCode: httpStatus.BAD_REQUEST,
            data: {},
            message: e.message,
        };
    }
};

// Frontend: get only active specializations
const getActiveSpecializations = async (profileId: number): Promise<IResponse> => {
    try {
        const specializations = await Specialization.findAll({
            where: { profileId, isActive: true },
        });

        return {
            error: false,
            statusCode: httpStatus.OK,
            data: specializations,
            message: "Active specializations fetched successfully.",
        };
    } catch (e: any) {
        return {
            error: true,
            statusCode: httpStatus.BAD_REQUEST,
            data: {},
            message: e.message,
        };
    }
};

//get single Specialization for frontend

const getSpecializationById = async (id: number): Promise<IResponse> => {
    try {
        const specialization = await Specialization.findOne({ where: { id, isActive: true } });
        if (!specialization) {
            return {
                error: true,
                statusCode: httpStatus.NOT_FOUND,
                data: {},
                message: "Specialization not found",
            };
        }
        return {
            error: false,
            statusCode: httpStatus.OK,
            data: specialization,
            message: "Specializations fetched successfully.",
        };
    } catch (e: any) {
        console.error(e);
        return {
            error: true,
            statusCode: httpStatus.BAD_REQUEST,
            data: {},
            message: `Something went wrong: ${e.message}`,
        };
    }
}
//get single Specialization for Admin

const getSpecializationByIdForAdmin = async (id: number): Promise<IResponse> => {
    try {
        const specialization = await Specialization.findByPk(id);
        if (!specialization) {
            return {
                error: true,
                statusCode: httpStatus.NOT_FOUND,
                data: {},
                message: "Specialization not found",
            };
        }
        return {
            error: false,
            statusCode: httpStatus.OK,
            data: specialization,
            message: "Specializations fetched successfully.",
        };
    } catch (e: any) {
        console.error(e);
        return {
            error: true,
            statusCode: httpStatus.BAD_REQUEST,
            data: {},
            message: `Something went wrong: ${e.message}`,
        };
    }
}
//update Specialization
const updateSpecialization = async (id: number, body: Partial<{ name: string }>): Promise<IResponse> => {
    try {
        const specialization = await Specialization.findOne({
            where: { id, isActive: true },
        });
        if (!specialization) {
            return {
                error: true,
                statusCode: httpStatus.NOT_FOUND,
                data: {},
                message: "Specialization not found",
            };
        }
        if (body.name) {
            const duplicate = await Specialization.findOne({
                where: {
                    name: body.name,
                    profileId: specialization.profileId,
                    isActive: true,
                    id: { [Op.ne]: id },
                },
            });

            if (duplicate) {
                return {
                    error: true,
                    statusCode: httpStatus.CONFLICT,
                    data: {},
                    message: "Specialization already exists for this profile",
                };
            }
        }

        await specialization.update(body);
        return {
            error: false,
            statusCode: httpStatus.OK,
            data: specialization,
            message: "Specializations updated successfully.",
        };
    } catch (e: any) {
        console.error(e);
        return {
            error: true,
            statusCode: httpStatus.BAD_REQUEST,
            data: {},
            message: `Something went wrong: ${e.message}`,
        };
    }
}
// soft delete specialization
const deleteSpecialization = async (id: number): Promise<IResponse> => {
    try {
        const specialization = await Specialization.findOne({
            where: {
                id,
                isActive: true,
            },
        });
        if (!specialization) {
            return {
                error: true,
                statusCode: httpStatus.NOT_FOUND,
                data: {},
                message: "Specialization not found",
            };
        }
        await specialization.update({ isActive: false });
        return {
            error: false,
            statusCode: httpStatus.OK,
            data: specialization,
            message: "Specialization deactivated successfully.",
        };
    } catch (e: any) {
        console.error(e);
        return {
            error: true,
            statusCode: httpStatus.BAD_REQUEST,
            data: {},
            message: `Something went wrong: ${e.message}`,
        };
    }
}
//  restore specialization
const restoreSpecialization = async (id: number): Promise<IResponse> => {
    try {
        const specialization = await Specialization.findOne({
            where: { id, isActive: false },
        });

        if (!specialization) {
            return {
                error: true,
                statusCode: httpStatus.NOT_FOUND,
                data: {},
                message: "Specialization not found or already active",
            };
        }
        const activeDuplicate = await Specialization.findOne({
            where: {
                name: specialization.name,
                profileId: specialization.profileId,
                isActive: true,
            },
        });

        if (activeDuplicate) {
            return {
                error: true,
                statusCode: httpStatus.CONFLICT,
                data: {},
                message: "Active specialization with same name already exists",
            };
        }


        await specialization.update({ isActive: true });

        return {
            error: false,
            statusCode: httpStatus.OK,
            data: specialization,
            message: "Specialization restored successfully",
        };
    } catch (e: any) {
        return {
            error: true,
            statusCode: httpStatus.BAD_REQUEST,
            data: {},
            message: e.message,
        };
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
    restoreSpecialization,
}