import path from "path";
import express from "express";
const router = express.Router();
import cloudinary from "../utils/cloudinaryConfig.js";
import upload from "../middleware/multer.js";

// import multer from "multer";
// import uploadMiddleware from "../middleware/uploadMiddleware.js";
// const uploadCloud = uploadMiddleware("Backpack");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },

//   filename: (req, file, cb) => {
//     const extname = path.extname(file.originalname);
//     cb(null, `${file.fieldname}-${Date.now()}${extname}`);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const filetypes = /jpe?g|png|webp/;
//   const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

//   const extname = path.extname(file.originalname).toLowerCase();
//   const mimetype = file.mimetype;

//   if (filetypes.test(extname) && mimetypes.test(mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Images only"), false);
//   }
// };

// const upload = multer({ storage, fileFilter });
// const uploadSingleImage = upload.single("image");

router.post("/", upload.single("image"), function (req, res) {
  cloudinary.uploader.upload(req?.file?.path, function (err, result) {
    // console.log(req);
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: err.message,
      });
    }
    res.status(200).json({
      message: "Image uploaded successfully",
      image: result.url,
    });
  });
});

// router.post("/", (req, res) => {
//   uploadSingleImage(req, res, (err) => {
//     console.log(req.file);
//     if (err) {
//       res.status(400).send({ message: err.message });
//     } else if (req.file) {
//       res.status(200).send({
//         message: "Image uploaded successfully",
//         image: `/${req.file.path}`,
//       });
//     } else {
//       res.status(400).send({ message: "No image file provided" });
//     }
//   });
// });

export default router;
