import httpStatus from "http-status";
import Profile from "../models/Profile.model";
import Specialization from "../models/Specialization.model";
import SubSpecialization from "../models/SubSpecialization.model";
import { IResponse } from "../types/response";
import { Op } from "sequelize";

// create Profile
const createProfile = async (body: { name: string }): Promise<IResponse> => {
    try {
        const existing = await Profile.findOne({ where: { name: body.name } });
        if (existing) {
            return {
                error: true,
                statusCode: httpStatus.CONFLICT,
                data: {},
                message: "Profile already exists",
            };
        }
        const profile = await Profile.create(body);
        return {
            error: false,
            statusCode: httpStatus.CREATED,
            data: profile,
            message: "profile created successfully.",
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
// Admin: get all profiles (active + inactive)
const getProfilesForAdmin = async (): Promise<IResponse> => {
    try {
        const profiles = await Profile.findAll({
            order: [["createdAt", "DESC"]]
        }); // no filter

        return {
            error: false,
            statusCode: httpStatus.OK,
            data: profiles,
            message: "All profiles fetched successfully.",
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

// Frontend: get only active profiles
const getActiveProfiles = async (): Promise<IResponse> => {
    try {
        const profiles = await Profile.findAll({
            where: { isActive: true },
        });

        return {
            error: false,
            statusCode: httpStatus.OK,
            data: profiles,
            message: "Active profiles fetched successfully.",
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

//get single profile for  frontend

const getProfileById = async (id: number): Promise<IResponse> => {
    try {
        const profile = await Profile.findOne({
            where: {
                id,
                isActive: true,
            },
        });
        if (!profile) {
            return {
                error: true,
                statusCode: httpStatus.NOT_FOUND,
                data: {},
                message: "Active profile not found",
            };
        }
        return {
            error: false,
            statusCode: httpStatus.OK,
            data: profile,
            message: "Active profile fetched successfully.",
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

//get single profile for Admin
const getProfileByIdForAdmin = async (id: number): Promise<IResponse> => {
    try {
        const profile = await Profile.findByPk(id, {
            include: [
                {
                    model: Specialization,
                     as: "specializations",
                    include: [
                        {
                            model: SubSpecialization,
                            as: "subSpecializations",
                        },
                    ],
                },
            ],
        });
        if (!profile) {
            return {
                error: true,
                statusCode: httpStatus.NOT_FOUND,
                data: {},
                message: "Profile not found",
            };
        }
        return {
            error: false,
            statusCode: httpStatus.OK,
            data: profile,
            message: "profiles fetched successfully.",
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
//update Profile
const updateProfile = async (
    id: number,
    body: Partial<{ name: string }>
): Promise<IResponse> => {
    try {
        //Guard: nothing to update
        if (!body.name) {
            return {
                error: true,
                statusCode: httpStatus.BAD_REQUEST,
                data: {},
                message: "Nothing to update",
            };
        }

        //Check duplicate ONLY if name is provided
        const existing = await Profile.findOne({
            where: {
                name: body.name,
                id: { [Op.ne]: id },
            },
        });

        if (existing) {
            return {
                error: true,
                statusCode: httpStatus.CONFLICT,
                data: {},
                message: "Profile name already exists",
            };
        }

        // Find active profile
        const profile = await Profile.findOne({
            where: { id, isActive: true },
        });

        if (!profile) {
            return {
                error: true,
                statusCode: httpStatus.NOT_FOUND,
                data: {},
                message: "Active profile not found",
            };
        }

        //  Update
        await profile.update(body);

        return {
            error: false,
            statusCode: httpStatus.OK,
            data: profile,
            message: "Profile updated successfully",
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

// soft delete profile
const deleteProfile = async (id: number): Promise<IResponse> => {
    try {
        const profile = await Profile.findOne({
            where: {
                id,
                isActive: true,
            },
        });
        if (!profile) {
            return {
                error: true,
                statusCode: httpStatus.NOT_FOUND,
                data: {},
                message: "Profile not found",
            };
        }
        //Deactivate profile
        await profile.update({ isActive: false });

        // Deactivate all specializations under profile
        const specializations = await Specialization.findAll({
            where: { profileId: id, isActive: true },
        });

        const specializationIds = specializations.map(s => s.id);

        await Specialization.update(
            { isActive: false },
            { where: { profileId: id } }
        );

        // Deactivate all sub-specializations under those specializations
        if (specializationIds.length > 0) {
            await SubSpecialization.update(
                { isActive: false },
                { where: { specializationId: specializationIds } }
            );
        }

        return {
            error: false,
            statusCode: httpStatus.OK,
            data: profile,
            message: "profile related data deactivated successfully.",
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

// restore profile
const restoreProfile = async (id: number): Promise<IResponse> => {
  try {
    // Check profile exists
    const profile = await Profile.findByPk(id);
    if (!profile) {
      return {
        error: true,
        statusCode: httpStatus.NOT_FOUND,
        data: {},
        message: "Profile not found",
      };
    }

    // Check if already active
    if (profile.isActive) {
      return {
        error: true,
        statusCode: httpStatus.BAD_REQUEST,
        data: {},
        message: "Profile is already active",
      };
    }

    // Restore profile
    await profile.update({ isActive: true });

    // Restore related data
    const specializations = await Specialization.findAll({
      where: { profileId: id },
    });

    const specializationIds = specializations.map(s => s.id);

    await Specialization.update(
      { isActive: true },
      { where: { profileId: id, isActive: false } }
    );

    if (specializationIds.length > 0) {
      await SubSpecialization.update(
        { isActive: true },
        {
          where: {
            specializationId: { [Op.in]: specializationIds },
            isActive: false,
          },
        }
      );
    }

    return {
      error: false,
      statusCode: httpStatus.OK,
      data: profile,
      message: "Profile and related data restored successfully",
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
    createProfile,
    getProfilesForAdmin,
    getActiveProfiles,
    getProfileById,
    getProfileByIdForAdmin,
    updateProfile,
    deleteProfile,
    restoreProfile
}