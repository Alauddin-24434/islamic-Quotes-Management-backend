import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import { envVariable } from "../config";

// Configure Cloudinary
cloudinary.config({
    cloud_name: envVariable.cloud_name,
    api_key: envVariable.api_key,
    api_secret: envVariable.api_secret
});

// Setup Cloudinary storage for multer
const storage = new CloudinaryStorage({
    cloudinary,
    params: (req, file) => {
        // Extract file extension from mimetype, e.g., "image/png" → "png"
        const fileFormat = file.mimetype.split("/")[1];
        return {
            folder: "islamic-Quotes-Management", // optional folder in Cloudinary
            format: fileFormat, // or file.mimetype.split("/")[1] for dynamic format
            public_id: `${Date.now()}-${file.originalname}`, // optional unique name
        };
    }
});

// Create multer middleware
export const upload = multer({ storage, limits: { fileSize: 2 * 1024 * 1024 } });
