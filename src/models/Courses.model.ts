import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize";

interface CourseAttribute {
    id: number,
    courseFor: string,
    specializationId: number,
    subSpecializationId: number,
    courseTitle: string,
    coursePrice: string,
    authorTitle: string,
    authorName: string,
    expiryDays: number,
    uploadBanner: string,
    uploadVideo: string,
    videoUrl: string,
    shortDescription: string,
    description: string,
    createdAt?: Date;
    updatedAt?: Date;
}
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
    public uploadBanner!: string;
    public uploadVideo!: string;
    public videoUrl!: string;
    public shortDescription!: string;
    public description!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
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
        specializationId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        subSpecializationId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        courseTitle:{
           type:DataTypes.STRING,
           allowNull:false, 
        },
        coursePrice:{
           type:DataTypes.FLOAT,
           allowNull:false, 
        },
        authorTitle:{
           type:DataTypes.ENUM("Mr","Pr","Dr","Ms"),
           allowNull:false,
           defaultValue:"Dr",
        },
        authorName:{
           type:DataTypes.STRING,
           allowNull:false,
        },
        expiryDays:{
           type:DataTypes.NUMBER,
           allowNull:false,
        },
        uploadBanner:{
           type:DataTypes.STRING,
           allowNull:false,
        },
        uploadVideo:{
           type:DataTypes.STRING,
           allowNull:false,
        },
        videoUrl:{
           type:DataTypes.STRING,
           allowNull:false,
        },
        shortDescription:{
           type:DataTypes.STRING,
           allowNull:false,
        },
        description:{
           type:DataTypes.STRING,
           allowNull:false,
        },
    },
    {
        sequelize,
        tableName: "courses",
        timestamps: true,
    }
)
export default Course;