const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRETE,
});

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage
});

const streamUpload = (req) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream((error, result) => {
            if (result) {
                resolve(result);
            } else {
                reject(error);
            }
        });

        if (req.file && req.file.buffer) {
            streamifier.createReadStream(req.file.buffer).pipe(stream);
        } else {
            reject(new Error("No file buffer found in the request"));
        }
    });
};

const uploadFile = async (req) => {
    try {
        const result = await streamUpload(req);
        return result;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
}

module.exports = {
    upload,
    uploadFile,
};
