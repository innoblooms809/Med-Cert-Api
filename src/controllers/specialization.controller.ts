import httpStatus from "http-status";
import Specialization from "../models/Specialization.model";
import { Request, Response } from "express";

// create Specialization
const createSpecialization = async (req: Request, res: Response) => {
  try {
    const specialization = await Specialization.create(req.body);
    return res.status(httpStatus.CREATED).send({
      error: false,
      statusCode: httpStatus.CREATED,
      data: specialization,
      message: "Specialization created successfully.",
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

// GET ALL Specialization
const getSpecializations = async (req: Request, res: Response) => {
  try {
    const specialization = await Specialization.findAll();
    return res.status(httpStatus.OK).send({
      error: false,
      statusCode: httpStatus.OK,
      data: specialization,
      message: "Specializations fetched successfully",
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
// GET Specialization BY ID
const getSpecializationById = async (req: Request, res: Response) => {
  try {
    const specialization = await Specialization.findByPk(req.params.specializationId);
    if (!specialization) {
      return res.status(httpStatus.NOT_FOUND).send({
        error: true,
        statusCode: httpStatus.NOT_FOUND,
        data: {},
        message: "Specialization not found",
      });
    }
    return res.status(httpStatus.OK).send({
      error: false,
      statusCode: httpStatus.OK,
      specialization,
      message: "Specialization fetched",
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
// UPDATE
const updateSpecialization = async (req: Request, res: Response) => {
  try {
    const specialization = await Specialization.findByPk(req.params.specializationId);
    if (!specialization) {
      return res.status(httpStatus.NOT_FOUND).send({
        error: true,
        statusCode: httpStatus.NOT_FOUND,
        data: {},
        message: "Specialization not found",
      });
    }

    await specialization.update(req.body);

    return res.status(httpStatus.OK).send({
      error: false,
      statusCode: httpStatus.OK,
      data: specialization,
      message: "Specialization updated",
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

// SOFT DELETE
const deleteSpecialization = async (req:Request,res:Response) => {
  try {
    const specialization = await Specialization.findByPk(req.params.specializationId);
    if (!specialization) {
      return res.status(httpStatus.NOT_FOUND).send({
        error: true,
        statusCode: httpStatus.NOT_FOUND,
        data: {},
        message: "Specialization not found",
      });
    }

    await specialization.destroy(); // soft delete

    return res.status(httpStatus.OK).send({
      error: false,
      statusCode: httpStatus.OK,
      data: {},
      message: "Specialization deleted (soft)",
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
  createSpecialization,
  getSpecializations,
  getSpecializationById,
  updateSpecialization,
  deleteSpecialization,
}