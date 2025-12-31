// models/specialization.model.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize";
import Specialization from "./Specialization.model";

class SubSpecialization extends Model {
  public id!: number;
  public name!: string;
  public specializationId!: number;
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
        model: "specializations", // must match the table name in DB
        key: "id",
      },
      onDelete: "CASCADE",// delete specializations if profile is deleted
    },
  },
  {
    sequelize,
    tableName: "sub_specializations",
    timestamps: true,
    freezeTableName:true,
    paranoid:true,
     indexes: [
      {
        unique: true,
        fields: ["name", "specializationId"], // prevent duplicate specialization for same profile
      },
    ],
  }
);

// Relation
Specialization.hasMany(SubSpecialization, { foreignKey: "specializationId",as: "subSpecializations", });
SubSpecialization.belongsTo(Specialization, { foreignKey: "specializationId", as: "specialization", });

export default SubSpecialization;
