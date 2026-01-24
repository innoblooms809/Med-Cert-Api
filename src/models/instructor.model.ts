import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/sequelize"; // Make sure you import the sequelize instance
import UserModal from "./user.model";

// Define the interface for the User model (with all properties)
// Use Optional for fields that can be null (e.g., defaults or nullable fields)
interface InstructorAttribute {
    id: number;
    userId: number;
    bio?: string;
    experience: number;
    hospitalName: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Define the type for creating a user (Optional will be used to handle defaults)
interface InstructorCreationAttribute
    extends Optional<InstructorAttribute, "id" | "bio"> { }

class InstructorModal extends Model<InstructorAttribute, InstructorCreationAttribute> {
    public id!: number;
    public userId!: number;
    public bio?: string;
    public experience!: number;
    public hospitalName!: string;
}

InstructorModal.init(
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
        bio: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        experience: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        hospitalName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "instructor_profiles",
        timestamps: true,
    }
);

InstructorModal.belongsTo(UserModal, { foreignKey: "userId", as: "user" });
UserModal.hasOne(InstructorModal, { foreignKey: "userId", as: "instructorProfile" });

export default InstructorModal;

