import * as path from "path";
import { Request, Response } from "express";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

 const handleUploadFile = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter(req, file, callback) {
    const extension =
      path.extname(file.originalname).toLowerCase() === ".pdf";

     const mimeType =
      file.mimetype === "application/pdf";

    if (extension && mimeType) {
      return callback(null, true);
    }
    callback(
      new Error(
        "Invalid file type.  Only PDF files are allowed!"
      )
    );
  },
});

export { handleUploadFile };
