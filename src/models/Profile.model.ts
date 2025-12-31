import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize";

class Profile extends Model {
  public id!: number;
  public name!: string;
  public readonly createdAt!:Date;
  public readonly updatedAt!:Date;
  public readonly deletedAt!:Date;
}

Profile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    deletedAt:{
      type:DataTypes.DATE,
    }
  },
  {
    sequelize,
    tableName: "profiles",
    freezeTableName:true,
    timestamps: true,
    paranoid:true,   //enables softdelete
  }
);

export default Profile;
