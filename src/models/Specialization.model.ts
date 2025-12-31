// models/specialization.model.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize";
import Profile from "./Profile.model";

class Specialization extends Model {
  public id!: number;
  public name!: string;
  public profileId!: number;
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
        model: "profiles", // must match the table name in DB
        key: "id",
      },
      onDelete: "CASCADE",// delete specializations if profile is deleted
    },
  },
  {
    sequelize,
    tableName: "specializations",
    timestamps: true,
    freezeTableName:true,
    paranoid: true, 
     indexes: [
      {
        unique: true,
        fields: ["name", "profileId"], // prevent duplicate specialization for same profile
      },
    ],
  }
);

// Relation
Profile.hasMany(Specialization, { foreignKey: "profileId" });
Specialization.belongsTo(Profile, { foreignKey: "profileId" });

export default Specialization;
