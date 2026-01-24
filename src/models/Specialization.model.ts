// models/specialization.model.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize";
import Profile from "./Profile.model";

interface SpecializationAttributes {
  id?: number;
  name: string;
  profileId: number;
  isActive?: boolean;
}

class Specialization extends Model<SpecializationAttributes> implements SpecializationAttributes {
  public id!: number;
  public name!: string;
  public profileId!: number;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Specialization.init(
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
    profileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Profile,
        key: "id",
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true, // active by default
    },
  },
  {
    sequelize,
    tableName: "specializations",
    timestamps: true,
    indexes: [
  { unique: true, fields: ["name", "profileId", "isActive"] },
  { fields: ["profileId"] },
],
  }
);

// Relation
Profile.hasMany(Specialization, { foreignKey: "profileId",as: "specializations",onDelete: "RESTRICT",onUpdate: "CASCADE", });
Specialization.belongsTo(Profile, { foreignKey: "profileId",as: "profile"});

export default Specialization;
