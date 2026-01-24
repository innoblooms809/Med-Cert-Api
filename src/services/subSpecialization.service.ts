import httpStatus from "http-status";
import { Op } from "sequelize";
import { IResponse } from "../types/response";
import SubSpecialization from "../models/SubSpecialization.model";

/**
 * Create SubSpecialization
 */
const createSubSpecialization = async (
  body: { name: string; specializationId: number }
): Promise<IResponse> => {
  try {
    const existing = await SubSpecialization.findOne({
      where: {
        name: body.name,
        specializationId: body.specializationId,
        isActive: true,
      },
    });

    if (existing) {
      return {
        error: true,
        statusCode: httpStatus.CONFLICT,
        data: {},
        message: "Sub-specialization already exists for this specialization",
      };
    }

    const subSpecialization = await SubSpecialization.create(body);

    return {
      error: false,
      statusCode: httpStatus.CREATED,
      data: subSpecialization,
      message: "Sub-specialization created successfully",
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
};

/**
 * Admin: Get all sub-specializations (active + inactive)
 */
const getSubSpecializationsForAdmin = async (): Promise<IResponse> => {
  try {
    const data = await SubSpecialization.findAll({
      order: [["createdAt", "DESC"]],
    });

    return {
      error: false,
      statusCode: httpStatus.OK,
      data,
      message: "All sub-specializations fetched successfully",
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

/**
 * Frontend: Get active sub-specializations by specializationId
 */
const getActiveSubSpecializations = async (
  specializationId: number
): Promise<IResponse> => {
  try {
    const data = await SubSpecialization.findAll({
      where: { specializationId, isActive: true },
    });

    return {
      error: false,
      statusCode: httpStatus.OK,
      data,
      message: "Active sub-specializations fetched successfully",
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

/**
 * Frontend: Get single active sub-specialization
 */
const getSubSpecializationById = async (id: number): Promise<IResponse> => {
  try {
    const data = await SubSpecialization.findOne({
      where: { id, isActive: true },
    });

    if (!data) {
      return {
        error: true,
        statusCode: httpStatus.NOT_FOUND,
        data: {},
        message: "Sub-specialization not found",
      };
    }

    return {
      error: false,
      statusCode: httpStatus.OK,
      data,
      message: "Sub-specialization fetched successfully",
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

/**
 * Admin: Get sub-specialization by ID
 */
const getSubSpecializationByIdForAdmin = async (
  id: number
): Promise<IResponse> => {
  try {
    const data = await SubSpecialization.findByPk(id);

    if (!data) {
      return {
        error: true,
        statusCode: httpStatus.NOT_FOUND,
        data: {},
        message: "Sub-specialization not found",
      };
    }

    return {
      error: false,
      statusCode: httpStatus.OK,
      data,
      message: "Sub-specialization fetched successfully",
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

/**
 * Update sub-specialization
 */
const updateSubSpecialization = async (
  id: number,
  body: Partial<{ name: string }>
): Promise<IResponse> => {
    console.log("UPDATE BODY:", body);

  try {
    const sub = await SubSpecialization.findOne({
      where: { id, isActive: true },
    });

    if (!sub) {
      return {
        error: true,
        statusCode: httpStatus.NOT_FOUND,
        data: {},
        message: "Sub-specialization not found",
      };
    }

    if (body.name && body.name !== sub.name) {
      const duplicate = await SubSpecialization.findOne({
        where: {
          name: body.name,
          specializationId: sub.specializationId,
          isActive: true,
          id: { [Op.ne]: id },
        },
      });

      if (duplicate) {
        return {
          error: true,
          statusCode: httpStatus.CONFLICT,
          data: {},
          message: "Sub-specialization already exists for this specialization",
        };
      }
    }

    await sub.update(body, { returning: true });
    await sub.reload(); //force refresh from DB


    return {
      error: false,
      statusCode: httpStatus.OK,
      data: sub,
      message: "Sub-specialization updated successfully",
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

/**
 * Soft delete sub-specialization
 */
const deleteSubSpecialization = async (id: number): Promise<IResponse> => {
  try {
    const sub = await SubSpecialization.findOne({
      where: { id, isActive: true },
    });

    if (!sub) {
      return {
        error: true,
        statusCode: httpStatus.NOT_FOUND,
        data: {},
        message: "Sub-specialization not found",
      };
    }

    await sub.update({ isActive: false });

    return {
      error: false,
      statusCode: httpStatus.OK,
      data: sub,
      message: "Sub-specialization deactivated successfully",
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

/**
 * Restore sub-specialization
 */
const restoreSubSpecialization = async (id: number): Promise<IResponse> => {
  try {
    const sub = await SubSpecialization.findOne({
      where: { id, isActive: false },
    });

    if (!sub) {
      return {
        error: true,
        statusCode: httpStatus.NOT_FOUND,
        data: {},
        message: "Sub-specialization not found or already active",
      };
    }

    const activeDuplicate = await SubSpecialization.findOne({
      where: {
        name: sub.name,
        specializationId: sub.specializationId,
        isActive: true,
      },
    });

    if (activeDuplicate) {
      return {
        error: true,
        statusCode: httpStatus.CONFLICT,
        data: {},
        message:
          "Active sub-specialization with same name already exists",
      };
    }

    await sub.update({ isActive: true });

    return {
      error: false,
      statusCode: httpStatus.OK,
      data: sub,
      message: "Sub-specialization restored successfully",
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
  createSubSpecialization,
  getSubSpecializationsForAdmin,
  getActiveSubSpecializations,
  getSubSpecializationById,
  getSubSpecializationByIdForAdmin,
  updateSubSpecialization,
  deleteSubSpecialization,
  restoreSubSpecialization,
};