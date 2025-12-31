import httpStatus from "http-status";
import Specialization from "../models/Specialization.model";
import { Request, Response } from "express";
import SubSpecialization from "../models/SubSpecialization.model";

// create Sub_Specialization
const createSubSpecialization = async (req: Request, res: Response) => {
    try {
        const subSpecialization = await SubSpecialization.create(req.body);
        return res.status(httpStatus.CREATED).send({
            error: false,
            statusCode: httpStatus.CREATED,
            data: subSpecialization,
            message: "subSpecialization created successfully.",
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

// GET ALL Sub_Specialization
const getSubSpecializations = async (req: Request, res: Response) => {
    try {
        const subSpecialization = await SubSpecialization.findAll();
        return res.status(httpStatus.OK).send({
            error: false,
            statusCode: httpStatus.OK,
            data: subSpecialization,
            message: "subSpecializations fetched successfully",
        });
    } catch (error: any) {
        return res.status(httpStatus.BAD_REQUEST).send({
            error: true,
            statusCode: httpStatus.BAD_REQUEST,
            data: {},
            message: error.message,
        });
    }
};
// GET getSubSpecialization BY ID
const getSubSpecializationById = async (req: Request, res: Response) => {
    try {
        const subSpecialization = await SubSpecialization.findByPk(req.params.subSpecializationId);
        if (!subSpecialization) {
            return res.status(httpStatus.NOT_FOUND).send({
                error: true,
                statusCode: httpStatus.NOT_FOUND,
                data: {},
                message: "subSpecialization not found",
            });
        }
        return res.status(httpStatus.OK).send({
            error: false,
            statusCode: httpStatus.OK,
            subSpecialization,
            message: "subSpecialization fetched",
        });
    }
    catch (e: any) {
        console.error(e);
        return res.status(httpStatus.BAD_REQUEST).send({
            error: true,
            statusCode: httpStatus.BAD_REQUEST,
            data: {},
            message: `Something went wrong: ${e.message}`,
        });
    }
};
// UPDATE Sub_Specialization
const updateSubSpecialization = async (req: Request, res: Response) => {
    try {
        const subSpecialization = await SubSpecialization.findByPk(req.params.subSpecializationId);
        if (!subSpecialization) {
            return res.status(httpStatus.NOT_FOUND).send({
                error: true,
                statusCode: httpStatus.NOT_FOUND,
                data: {},
                message: "subSpecialization not found",
            });
        }

        await subSpecialization.update(req.body);

        return res.status(httpStatus.OK).send({
            error: false,
            statusCode: httpStatus.OK,
            data: subSpecialization,
            message: "subSpecialization updated",
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
};

// SOFT DELETE Sub_Specialization
const deleteSubSpecialization = async (req: Request, res: Response) => {
    try {
        const subSpecialization = await SubSpecialization.findByPk(req.params.subSpecializationId);
        if (!subSpecialization) {
            return res.status(httpStatus.NOT_FOUND).send({
                error: true,
                statusCode: httpStatus.NOT_FOUND,
                data: {},
                message: "subSpecialization not found",
            });
        }

        await subSpecialization.destroy(); // soft delete

        return res.status(httpStatus.OK).send({
            error: false,
            statusCode: httpStatus.OK,
            data: {},
            message: "subSpecialization deleted (soft)",
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
};
export default {
    createSubSpecialization,
    getSubSpecializations,
    getSubSpecializationById,
    updateSubSpecialization,
    deleteSubSpecialization,
}