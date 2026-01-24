import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/sequelize"; // Make sure you import the sequelize instance
import UserModal from "./user.model";

// Define the interface for the User model (with all properties)
// Use Optional for fields that can be null (e.g., defaults or nullable fields)
interface UserProfileAttribute {
    id: number;
    userId: number;
    specializationId: number;
    subSpecializationId: number;
    licenseNumber: string;
    hospitalName: string;
    experience: number;
    country: string;
    isActive:boolean
    createdAt?: Date;
    updatedAt?: Date;
}

// Define the type for creating a user (Optional will be used to handle defaults)
interface UserProfileCreationAttribute
    extends Optional<UserProfileAttribute, "id"> { }

class UserProfile extends Model<UserProfileAttribute, UserProfileCreationAttribute> {
    public id!: number;
    public userId!: number;
    public specializationId!: number;
    public subSpecializationId!: number;
    public licenseNumber!: string;
    public hospitalName!: string;
    public isActive!: boolean;
    public experience!: number;
    public country!: string;

    // Define timestamps (createdAt, updatedAt) automatically added by Sequelize
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

UserProfile.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        specializationId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        subSpecializationId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        licenseNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        hospitalName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        experience: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isActive:{
            type: DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:true
        }
    },
    {
        sequelize, // The sequelize instance imported from your configuration
        tableName: "user_profile", // Name of the table in the database
        timestamps: true, // Automatically adds createdAt and updatedAt
    }
);
/* ASSOCIATION */
UserModal.hasOne(UserProfile, { foreignKey: "userId", as: "profile" });
UserProfile.belongsTo(UserModal, { foreignKey: "userId" });
export default UserProfile;

