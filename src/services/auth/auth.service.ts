import httpStatus from "http-status";
import { sequelize } from "../../config/sequelize";
import User from "../../models/user.model";
import UserProfile from "../../models/userProfile.model";
import Role from "../../models/Role.model";
import EncryptPassword from "../../utils/encryption";
import { IResponse } from "../../types/response";

/**
 * REGISTER USER (PUBLIC)
 */
const registerUser = async (body: any): Promise<IResponse> => {
  const transaction = await sequelize.transaction();

  try {
    let {
      firstName,
      lastName,
      emailId,
      password,
      specializationId,
      subSpecializationId,
      licenseNumber,
      hospitalName,
      experience,
      country,
    } = body;

    // 1. Check existing user
    const existingUser = await User.findOne({ where: { emailId } });
    if (existingUser) {
      return {
        error: true,
        statusCode: httpStatus.CONFLICT,
        data: {},
        message: "Email already registered",
      };
    }

    // 2. Get DEFAULT role (USER / DOCTOR)
    const defaultRole = await Role.findOne({ where: { role: "USER" } });
    if (!defaultRole) {
      throw new Error("Default role not found");
    }

    // 3. Encrypt password
    const encryptedPassword = await EncryptPassword.encryptPassword(password);

    // 4. Create User
    const user = await User.create(
      {
        firstName,
        lastName,
        emailId,
        password: encryptedPassword,
        roleId: defaultRole.id,
      },
      { transaction }
    );
console.log("jhgfdswsedrtfgyhujikoh:::::::",user);
    // 5. Create User Profile
    // await UserProfile.create(
    //   {
    //     userId: user.id,
    //     specializationId,
    //     subSpecializationId,
    //     licenseNumber,
    //     hospitalName,
    //     experience,
    //     country,
    //   },
    //   { transaction }
    // );

    await transaction.commit();

    const { password: _, ...userData } = user.toJSON();

    return {
      error: false,
      statusCode: httpStatus.CREATED,
      data: userData,
      message: "Account created successfully",
    };
  } catch (e: any) {
    await transaction.rollback();
    return {
      error: true,
      statusCode: httpStatus.BAD_REQUEST,
      data: {},
      message: e.message,
    };
  }
};

/**
 * LOGIN USER (PUBLIC)
 */
const loginUser = async (
  emailId: string,
  password: string
): Promise<IResponse> => {
  try {
    const user: any = await User.findOne({
      where: { emailId, isActive: true },
      include: [{ model: Role, as: "role" }],
    });

    if (!user) {
      return {
        error: true,
        statusCode: httpStatus.BAD_REQUEST,
        data: {},
        message: "Invalid credentials",
      };
    }

    const isMatch = await EncryptPassword.isPasswordMatch(
      password,
      user.password
    );

    if (!isMatch) {
      return {
        error: true,
        statusCode: httpStatus.BAD_REQUEST,
        data: {},
        message: "Invalid credentials",
      };
    }

    const { password: _, ...userData } = user.toJSON();

    return {
      error: false,
      statusCode: httpStatus.OK,
      data: userData,
      message: "Login successful",
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
  registerUser,
  loginUser,
};
