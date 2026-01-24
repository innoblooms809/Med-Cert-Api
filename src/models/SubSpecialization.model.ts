import { DataTypes, Model, Optional} from "sequelize";
import { sequelize } from "../config/sequelize";
import Specialization from "./Specialization.model";


/**
 * Attributes stored in DB
 */
export interface SubSpecializationAttributes {
  id: number;
  name: string;
  specializationId: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Attributes required during creation
 */
export interface SubSpecializationCreationAttributes
  extends Optional<SubSpecializationAttributes, "id" | "isActive"> {}
class SubSpecialization extends Model<
    SubSpecializationAttributes,
    SubSpecializationCreationAttributes
  >implements SubSpecializationAttributes {
  public id!: number;
  public name!: string;
  public specializationId!: number;
  public isActive!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

SubSpecialization.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    specializationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Specialization, // must match the table name in DB
        key: "id",
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  },
  {
    sequelize,
    tableName: "sub_specializations",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["name", "specializationId"],
      },
      {
        fields: ["specializationId"],
      },
    ],

  }
);

// Relation
Specialization.hasMany(SubSpecialization, { foreignKey: "specializationId", as: "subSpecializations", onDelete: "RESTRICT", onUpdate: "CASCADE", });
SubSpecialization.belongsTo(Specialization, { foreignKey: "specializationId", as: "specialization", });

export default SubSpecialization;
