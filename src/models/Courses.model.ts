import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize";

class Course extends Model {
    public id!: number;
    public courseFor!: string;
    public specializationId!: number;
    public subSpecializationId!: number;
    public courseTitle!: string;
    public coursePrice!: number;
    public authorTitle!: string;
    public authorName!: string;
    public expiryDays!: number;
    public bannerUrl!: string;
    public videoUrl!: string;
    public shortDescription!: string;
    public description!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}
Course.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        courseFor: {
            type: DataTypes.ENUM("doctor", "nurse", "technician"),
            allowNull: false,
        },
        specializationId:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        subSpecializationId:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
    },
    {
        sequelize,
        tableName: "courses",
        freezeTableName: true,
        timestamps: true,
        paranoid: true,   //enables softdelete
    }
)
export default Course;