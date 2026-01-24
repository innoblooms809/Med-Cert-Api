import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/sequelize"; // Make sure you import the sequelize instance
// import Access from "./Access.model";
import Role from "./Role.model";

// Define the interface for the User model (with all properties)
// Use Optional for fields that can be null (e.g., defaults or nullable fields)
interface UserAttributes {
  id: number;           // ADD THIS
  firstName: string;
  lastName: string;
  emailId: string;
  password: string;
  roleId: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the type for creating a user (Optional will be used to handle defaults)
interface UserCreationAttributes
  extends Optional<UserAttributes,"id"| "isActive"> { }

class UserModal extends Model<UserAttributes, UserCreationAttributes> {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public emailId!: string;
  public password!: string;
  public roleId!: number;
  public isActive!: boolean;

  // Define timestamps (createdAt, updatedAt) automatically added by Sequelize
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

}

UserModal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    emailId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER, // Same as userPhoto
      allowNull: false,
      references: {
        model: "roles", // Reference to the Role model
        key: 'id',
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Default status is 1
    },
  },
  {
    sequelize, // The sequelize instance imported from your configuration
    tableName: "wecert_users", // Name of the table in the database
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);
// Associations
UserModal.belongsTo(Role, { foreignKey: "roleId", as: "role" });
Role.hasMany(UserModal, { foreignKey: "roleId" });
export default UserModal;

