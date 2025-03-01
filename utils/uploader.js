import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "/tmp/upload",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const limits = { fileSize: 500 * 1024 * 1025 };

export const upload = multer({ storage, limits });

cloudinary.config({
  cloud_name: "dbmbskzzr",
  api_key: "913423435775917",
  api_secret: "pP-Iz5UFdxmVS_WpCTUvnjvJxJo",
});

export const uploadVideo = async (file, publicId) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "video",
      public_id: publicId,
      overwrite: false,
    });
    fs.unlink(file, (err) => {
      if (err) {
        console.log("Error", err);
        return;
      }
      console.log("File", file, "unlinked");
    });
    return result;
  } catch (error) {
    console.error("Error", error);
  }
};

export const uploadPhoto = async (file, publicId) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "image",
      public_id: publicId,
      overwrite: false,
    });
    fs.unlink(file, (err) => {
      if (err) {
        console.log("Error", err);
        return;
      }
      console.log("File", file, "unlinked !");
    });
    return result;
  } catch (error) {
    console.error("Error", error);
  }
}
