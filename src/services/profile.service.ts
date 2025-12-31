// import httpStatus from "http-status";
// import Profile from "../models/Profile.model";
// import { IResponse } from "../types/response";

// // create Profile
// const createProfile = async (req: any): Promise<IResponse> => {
//     try {
//         const profile = await Profile.create(req.body);
//         return {
//             error: false,
//             statusCode: httpStatus.CREATED,
//             data: profile,
//             message: "profile created successfully.",
//         };
//     } catch (e: any) {
//         console.error(e);
//         return {
//             error: true,
//             statusCode: httpStatus.BAD_REQUEST,
//             data: {},
//             message: `Something went wrong: ${e.message}`,
//         };
//     }
// }
// //get all profiles
// const getProfiles = async (): Promise<IResponse> => {
//     try {
//         const profiles = await Profile.findAll();//excludes softdeleted by default
//         return {
//             error: false,
//             statusCode: httpStatus.CREATED,
//             data: profiles,
//             message: "profiles fetched successfully.",
//         };
//     } catch (e: any) {
//         console.error(e);
//         return {
//             error: true,
//             statusCode: httpStatus.BAD_REQUEST,
//             data: {},
//             message: `Something went wrong: ${e.message}`,
//         };
//     }
// }
// //get single profile
// const getProfileById = async (id: number): Promise<IResponse> => {
//     try {
//         const profile = await Profile.findByPk(id);
//         if (!profile) {
//             return {
//                 error: true,
//                 statusCode: httpStatus.NOT_FOUND,
//                 data: {},
//                 message: "Profile not found",
//             };
//         }
//         return {
//             error: false,
//             statusCode: httpStatus.CREATED,
//             data: profile,
//             message: "profiles fetched successfully.",
//         };
//     } catch (e: any) {
//         console.error(e);
//         return {
//             error: true,
//             statusCode: httpStatus.BAD_REQUEST,
//             data: {},
//             message: `Something went wrong: ${e.message}`,
//         };
//     }
// }
// //update Profile
// const updateProfile = async (id: number,body:any): Promise<IResponse> => {
//     try {
//         const profile = await Profile.findByPk(id);
//         if (!profile) {
//             return {
//                 error: true,
//                 statusCode: httpStatus.NOT_FOUND,
//                 data: {},
//                 message: "Profile not found",
//             };
//         }
//          await profile.update(body);
//         return {
//             error: false,
//             statusCode: httpStatus.CREATED,
//             data: profile,
//             message: "profiles updated successfully.",
//         };
//     } catch (e: any) {
//         console.error(e);
//         return {
//             error: true,
//             statusCode: httpStatus.BAD_REQUEST,
//             data: {},
//             message: `Something went wrong: ${e.message}`,
//         };
//     }
// }
// // soft delete profile
// const deleteProfile  = async (id: number): Promise<IResponse> => {
//     try {
//         const profile = await Profile.findByPk(id);
//         if (!profile) {
//             return {
//                 error: true,
//                 statusCode: httpStatus.NOT_FOUND,
//                 data: {},
//                 message: "Profile not found",
//             };
//         }
//          await profile.destroy();
//         return {
//             error: false,
//             statusCode: httpStatus.CREATED,
//             data: profile,
//             message: "profile softdeleted successfully.",
//         };
//     } catch (e: any) {
//         console.error(e);
//         return {
//             error: true,
//             statusCode: httpStatus.BAD_REQUEST,
//             data: {},
//             message: `Something went wrong: ${e.message}`,
//         };
//     }
// }
// export default {
//     createProfile,
//     getProfiles,
//     getProfileById,
//     updateProfile,
//     deleteProfile,
// }