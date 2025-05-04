import cloudinary from "cloudinary";
import fs from "fs/promises";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const env = require("../.data/.env.json");

cloudinary.config(env.cloudinary);

const cloudinaryStore = {
  async uploadImage(file, folder = "uploads") {
    const tempPath = file.tempFilePath || `/tmp/${file.name}`;
    if (!file.tempFilePath) await file.mv(tempPath);

    const result = await cloudinary.v2.uploader.upload(tempPath, { folder });
    await fs.unlink(tempPath);

    return result.secure_url;
  },
};

export default cloudinaryStore;
