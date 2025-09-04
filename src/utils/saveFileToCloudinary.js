import cloudinary from "cloudinary";
import fs from "node:fs/promises";
import { getEnvVar } from "./getEnvVar.js";
import { CLOUDINARY } from "../constants/index.js";

cloudinary.v2.config({
  secure: true,
  cloud_name: getEnvVar("CLOUD_NAME"),
  api_key: getEnvVar("API_KEY"),
  api_secret: getEnvVar("API_SECRET"),
});

export const saveFileToCloudinary = async (file) => {
  try {
    const filePath = file.path.replace(/\\/g, "/");
    const response = await cloudinary.v2.uploader.upload(filePath, {
      folder: "contacts",
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    });
    await fs.unlink(file.path); 
    return response.secure_url;
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    throw err;
  }
};