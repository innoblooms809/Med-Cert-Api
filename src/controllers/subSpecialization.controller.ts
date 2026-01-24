import httpStatus from "http-status";
import { Request, Response } from "express";
import subSpecializationService from "../services/subSpecialization.service";

/**
 * Create Sub-Specialization
 */
const createSubSpecialization = async (req: Request, res: Response) => {
  try {
    const result = await subSpecializationService.createSubSpecialization(
      req.body
    );
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

/**
 * Admin: Get all sub-specializations (active + inactive)
 */
const getSubSpecializationsForAdmin = async (
  req: Request,
  res: Response
) => {
  try {
    const result =
      await subSpecializationService.getSubSpecializationsForAdmin();
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

/**
 * Frontend: Get active sub-specializations by specializationId
 * ?specializationId=1
 */
const getActiveSubSpecializations = async (
  req: Request,
  res: Response
) => {
  try {
    const specializationId = Number(req.query.specializationId);

    if (!specializationId) {
      return res.status(httpStatus.BAD_REQUEST).json({
        error: true,
        statusCode: httpStatus.BAD_REQUEST,
        data: {},
        message: "specializationId is required",
      });
    }

    const result =
      await subSpecializationService.getActiveSubSpecializations(
        specializationId
      );

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

/**
 * Frontend: Get single active sub-specialization
 */
const getSubSpecializationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result =
      await subSpecializationService.getSubSpecializationById(Number(id));

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

/**
 * Admin: Get sub-specialization by ID
 */
const getSubSpecializationByIdForAdmin = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const result =
      await subSpecializationService.getSubSpecializationByIdForAdmin(
        Number(id)
      );

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

/**
 * Update Sub-Specialization
 */
const updateSubSpecialization = async (req: Request, res: Response) => {
  try {
    console.log("CONTROLLER BODY:", req.body);
    const { id } = req.params;

    const result =
      await subSpecializationService.updateSubSpecialization(
        Number(id),
        req.body
      );

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

/**
 * Soft delete Sub-Specialization
 */
const deleteSubSpecialization = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result =
      await subSpecializationService.deleteSubSpecialization(Number(id));

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

/**
 * Restore Sub-Specialization
 */
const restoreSubSpecialization = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result =
      await subSpecializationService.restoreSubSpecialization(Number(id));

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
  createSubSpecialization,
  getSubSpecializationsForAdmin,
  getActiveSubSpecializations,
  getSubSpecializationById,
  getSubSpecializationByIdForAdmin,
  updateSubSpecialization,
  deleteSubSpecialization,
  restoreSubSpecialization,
};
