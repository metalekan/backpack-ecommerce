const multer = require("multer");
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
cloudin;
// const cloudinary = require("./cloudinaryConfig");
const path = require("path");

function uploadMiddleware(folderName) {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
      // Set the folderPath to be inside 'uploads' in the root directory
      const folderPath = `Backpack/${folderName.trim()}`;
      const fileExtension = path.extname(file.originalname).substring(1);
      const publicId = `${file.fieldname}-${Date.now()}`;

      return {
        folder: folderPath,
        public_id: publicId,
        format: fileExtension,
      };
    },
  });

  return multer({
    storage: storage,
    limits: {
      fileSize: 5 * 1024 * 1024, // keep images size < 5 MB
    },
  });
}

module.exports = uploadMiddleware;
